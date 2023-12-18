import { useEffect, useRef } from 'react';
import { TONES } from '../utils/notes';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);
	const playSoundRef = useRef<(frequency: number) => void>();

	// audio logic wrapped in useEffect so that we can call audio.close() during cleanup/dismount
	useEffect(() => {
		const audio = new AudioContext();
		const gainNode = audio.createGain();
		gainNode.gain.value = 0.3; // lower gain to prevent clipping
		gainNode.connect(audio.destination);

		playSoundRef.current = function (frequency: number) {
			console.log(`playing ${frequency}`);

			// TODO adjust ADSR
			const oscillator = audio.createOscillator();
			oscillator.type = 'sine';
			oscillator.connect(gainNode);
			oscillator.frequency.value = frequency;
			oscillator.start();
			oscillator.stop(audio.currentTime + 0.5);
		};

		return () => {
			audio.close();
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
