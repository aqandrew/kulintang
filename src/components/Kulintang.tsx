import useKeyboardBindings from '../hooks/useKeyboardBindings';

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
		// TODO style buttons to be bigger
		<>
			{TONES.map((tone, i) => (
				<button key={i}>{tone}</button>
			))}
		</>
	);
}
