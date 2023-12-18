// based on https://github.com/joshwcomeau/use-sound/blob/22651057278be62c775d266dd61b279a3040f155/stories/demos/DrumMachine.js#L9C1-L25C3

import { useEffect } from 'react';

type UseKeyboardBindingsArgs = {
	[key: string]: () => void;
};

export default function useKeyboardBindings(map: UseKeyboardBindingsArgs) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const handler = map[event.key];

			if (handler) {
				handler();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [map]);
}
