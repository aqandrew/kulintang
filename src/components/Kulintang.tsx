import useKeyboardBindings from '../hooks/useKeyboardBindings';
import './Kulintang.css';

const TONES = ['Bb', 'B', 'Db', 'E', 'F', 'Gb', 'Ab', 'Bb'];

export default function Kulintang() {
	useKeyboardBindings(
		TONES.reduce(
			(map, tone, index) => ({
				...map,
				// TODO play sound
				[index + 1]: () => console.log(`you pressed ${tone}`),
			}),
			{}
		)
	);

	return (
		<div className="Kulintang">
			{TONES.map((tone, i) => (
				<button key={i}>{tone}</button>
			))}
		</div>
	);
}
