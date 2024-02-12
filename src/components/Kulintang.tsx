import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useDrag } from '@use-gesture/react';
import { TONES } from '../utils/notes';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);
	const synthRef = useRef<Tone.PolySynth>();

	function playSound(frequency: number) {
		synthRef.current?.triggerAttackRelease(frequency, 1 / 8);
	}

	function animateGong(i: number) {
		const gongClassList = gongsRef.current[i]?.classList;

		gongClassList?.add('hit');

		setTimeout(() => {
			gongClassList?.remove('hit');
		}, 0);
	}

	function handleHit(frequency: number, i: number) {
		playSound(frequency);
		animateGong(i);
	}

	useEffect(() => {
		synthRef.current = new Tone.PolySynth(Tone.Synth, {
			envelope: {
				attack: 0.001,
				decay: 0.05,
				sustain: 0.1,
				release: 2,
			},
		}).toDestination();

		return () => {
			synthRef.current?.dispose();
		};
	}, []);

	// listen for presses on keys 1-8
	useKeyboardBindings(
		TONES.reduce(
			(keyMap, { frequency }, i) => ({
				...keyMap,
				[i + 1]: () => handleHit(frequency, i),
			}),
			{}
		)
	);

	const bind = useDrag(
		({ args: [frequency, gongIndex], tap, touches }) => {
			if (tap) {
				handleHit(frequency, gongIndex);
			}

			if (touches > 1) {
				// TODO fire multiple `handleHit`s
			}
		},
		{ filterTaps: true }
	);

	return (
		<div className="Kulintang">
			{TONES.map(({ name, frequency }, i) => (
				<button
					ref={(element) => (gongsRef.current[i] = element)}
					{...bind(frequency, i)}
					key={i}
				>
					{name}
				</button>
			))}
		</div>
	);
}
