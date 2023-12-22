import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { TONES } from '../utils/notes';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);
	const synthRef = useRef<Tone.PolySynth>();
	const playSoundRef = useRef<(frequency: number) => void>();

	useEffect(() => {
		synthRef.current = new Tone.PolySynth().toDestination();

		playSoundRef.current = function (frequency: number) {
			console.log(`playing ${frequency}`);

			// TODO adjust ADSR
			synthRef.current?.triggerAttackRelease(frequency, 0.25);
		};

		return () => {
			synthRef.current?.dispose();
		};
	}, []);

	// listen for presses on keys 1-8
	useKeyboardBindings(
		TONES.reduce(
			(keyMap, { frequency }, i) => ({
				...keyMap,
				[i + 1]: () => {
					playSoundRef.current!(frequency);
				},
			}),
			{}
		)
	);

	return (
		<div className="Kulintang">
			{TONES.map(({ name, frequency }, i) => (
				<button
					ref={(element) => {
						gongsRef.current[i] = element;
					}}
					onMouseDown={() => playSoundRef.current!(frequency)}
					key={i}
				>
					{name}
				</button>
			))}
		</div>
	);
}
