import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { TONES } from '../utils/notes';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);
	const synthRef = useRef<Tone.PolySynth>();

	function playSound(frequency: number) {
		console.log(`playing ${frequency}`);

		synthRef.current?.triggerAttackRelease(frequency, 0.25);
	}

	useEffect(() => {
		// TODO adjust ADSR
		synthRef.current = new Tone.PolySynth().toDestination();

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
