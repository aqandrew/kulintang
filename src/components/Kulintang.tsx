import { useRef } from 'react';
import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

// Pelog scale for gamelan
// https://www.youtube.com/watch?si=F7sb2W6o500chwRT&t=114&v=FAi4RSDv4ig&feature=youtu.be
const TONES = ['Bb', 'B', 'Db', 'E', 'F', 'Gb', 'Ab', 'Bb'];

function playSound(tone: string, index: number) {
	console.log(`TODO play ${tone}${index}`);
}

export default function Kulintang() {
	const gongsRef = useRef<(HTMLElement | null)[]>([]);

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
					onClick={() => playSound(tone, i)}
					key={i}
				>
					{tone}
				</button>
			))}
		</div>
	);
}
