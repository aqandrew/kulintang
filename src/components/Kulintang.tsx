import { useEffect, useRef } from 'react';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

type Note = {
	name: string;
	frequency: number;
};

// Pelog scale for gamelan
// https://www.youtube.com/watch?si=F7sb2W6o500chwRT&t=114&v=FAi4RSDv4ig&feature=youtu.be
// frequencies from https://pages.mtu.edu/~suits/notefreqs.html
const TONES: Note[] = [
	{ name: 'Bb', frequency: 233.08 },
	{ name: 'B', frequency: 246.94 },
	{ name: 'Db', frequency: 277.18 },
	{ name: 'E', frequency: 329.63 },
	{ name: 'F', frequency: 349.23 },
	{ name: 'Gb', frequency: 369.99 },
	{ name: 'Ab', frequency: 415.3 },
	{ name: 'Bb', frequency: 466.16 },
];

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

			// TODO adjust ADSR instead of using 500ms timeout
			const oscillator = audio.createOscillator();
			oscillator.type = 'sine';
			oscillator.connect(gainNode);
			oscillator.frequency.value = frequency;
			oscillator.start();

			setTimeout(() => {
				oscillator.stop();
			}, 500);
		};

		return () => {
			audio.close();
		};
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
			{TONES.map(({ name, frequency }, i) => (
				<button
					ref={(element) => {
						gongsRef.current[i] = element;
					}}
					onClick={() => playSoundRef.current!(frequency)}
					key={i}
				>
					{name}
				</button>
			))}
		</div>
	);
}
