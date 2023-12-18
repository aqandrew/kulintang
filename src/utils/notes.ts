const NOTE_NAMES = [
	'A',
	'Bb',
	'B',
	'C',
	'Db',
	'D',
	'Eb',
	'E',
	'F',
	'Gb',
	'G',
	'Ab',
];

function getNoteName(semitonesFromA4: number) {
	// remainder expression accounts for negative numbers
	// https://stackoverflow.com/a/4467559
	const modulus = NOTE_NAMES.length;
	const remainder = ((semitonesFromA4 % modulus) + modulus) % modulus;

	return NOTE_NAMES[remainder];
}

function getFrequency(semitonesFromA4: number) {
	return 2 ** (semitonesFromA4 / 12) * 440;
}

type Note = {
	name: string;
	frequency: number;
};

// Pelog scale for gamelan
// https://www.youtube.com/watch?si=F7sb2W6o500chwRT&t=114&v=FAi4RSDv4ig&feature=youtu.be
export const TONES: Note[] = [1, 2, 4, 7, 8, 9, 11, 13].map((n) => ({
	name: getNoteName(n),
	frequency: getFrequency(n),
}));
