import { useEffect, useRef } from 'react';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

// Pelog scale for gamelan
// https://www.youtube.com/watch?si=F7sb2W6o500chwRT&t=114&v=FAi4RSDv4ig&feature=youtu.be
const TONES = ['Bb', 'B', 'Db', 'E', 'F', 'Gb', 'Ab', 'Bb'];

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);
	let playSound: (tone: string, index: number) => void;

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

	// audio logic wrapped in useEffect so that we can call audio.close() during cleanup/dismount
	useEffect(() => {
		const audio = new AudioContext();
		const gainNode = audio.createGain();
		gainNode.connect(audio.destination);

		playSound = function (tone: string, index: number) {
			console.log(`playing ${tone}${index}`);

			const oscillator = audio.createOscillator();
			oscillator.type = 'sine';
			oscillator.connect(gainNode);
			// TODO set frequency per tone
			oscillator.frequency.value = 440;
			oscillator.start();

			setTimeout(() => {
				oscillator.stop();
			}, 500);
		};

		return () => {
			audio.close();
		};
	}, []);

	return (
		<div className="Kulintang">
			{TONES.map((tone, i) => (
				<button
					ref={(element) => {
						gongsRef.current[i] = element;
					}}
					onClick={() => playSound(tone, i)}
					key={i}
				>
					{tone}
				</button>
			))}
		</div>
	);
}
