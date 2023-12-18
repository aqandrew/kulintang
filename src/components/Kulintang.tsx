import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

// Pelog scale for gamelan
// https://www.youtube.com/watch?si=F7sb2W6o500chwRT&t=114&v=FAi4RSDv4ig&feature=youtu.be
const TONES = ['Bb2', 'B2', 'Db3', 'E3', 'F3', 'Gb3', 'Ab3', 'Bb3'];

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);
	const synthRef = useRef<Tone.PolySynth>();

	useEffect(() => {
		synthRef.current = new Tone.PolySynth().toDestination();
		synthRef.current.set({
			envelope: {
				attack: 0.001,
				decay: 0.1,
				sustain: 0.1,
				release: 1,
			},
		});
	}, []);

	// trigger click events for keys 1-8
	useKeyboardBindings(
		TONES.reduce(
			(keyMap, _, i) => ({
				...keyMap,
				[i + 1]: () => {
					gongsRef.current[i]?.click();
				},
			}),
			{}
		)
	);

	return (
		<div className="Kulintang">
			{TONES.map((tone, i) => (
				<button
					ref={(element) => {
						gongsRef.current[i] = element;
					}}
					onClick={() => synthRef.current!.triggerAttackRelease(tone, '1n')}
					key={i}
				>
					{tone}
				</button>
			))}
		</div>
	);
}
