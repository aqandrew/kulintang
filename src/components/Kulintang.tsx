import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

// Pelog scale for gamelan
// https://www.youtube.com/watch?si=F7sb2W6o500chwRT&t=114&v=FAi4RSDv4ig&feature=youtu.be
const TONES = ['Bb', 'B', 'Db', 'E', 'F', 'Gb', 'Ab', 'Bb'];

function playSound(tone: string, index: number) {
	console.log(`TODO play ${tone}${index}`);
}

export default function Kulintang() {
	useKeyboardBindings(
		TONES.reduce(
			(keyMap, tone, i) => ({
				...keyMap,
				[i + 1]: () => playSound(tone, i),
			}),
			{}
		)
	);

	return (
		<div className="Kulintang">
			{TONES.map((tone, i) => (
				<button onClick={() => playSound(tone, i)} key={i}>
					{tone}
				</button>
			))}
		</div>
	);
}
