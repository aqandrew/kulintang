import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { TONES } from '../utils/notes';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);
	const synthRef = useRef<Tone.PolySynth>();

	function playSound(frequency: number) {
		synthRef.current?.triggerAttackRelease(frequency, 0.25);
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
				[i + 1]: () => playSound(frequency),
			}),
			{}
		)
	);

	return (
		<div className="Kulintang">
			{TONES.map(({ name, frequency }, i) => (
				<button
					ref={(element) => (gongsRef.current[i] = element)}
					onMouseDown={() => playSound(frequency)}
					key={i}
				>
					{name}
				</button>
			))}
		</div>
	);
}
