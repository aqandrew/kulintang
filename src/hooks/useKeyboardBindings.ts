// based on https://github.com/joshwcomeau/use-sound/blob/22651057278be62c775d266dd61b279a3040f155/stories/demos/DrumMachine.js#L9C1-L25C3

import { useEffect } from 'react';

type UseKeyboardBindingsArgs = {
	map: { [key: string]: () => void };
	handleRelease: () => void;
};

export default function useKeyboardBindings({
	map,
	handleRelease,
}: UseKeyboardBindingsArgs) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const handler = map[event.key];

			if (handler) {
				handler();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleRelease);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleRelease);
		};
	}, [map]);
}
