import { useState } from 'react';
import Kulintang from './components/Kulintang';
import './App.css';

function App() {
	const [didClick, setDidClick] = useState(false);

	return (
		<>
			<h1>kulintang</h1>

			{/* need user gesture to allow AudioContext to be created */}
			{didClick ? (
				<Kulintang />
			) : (
				<button onClick={() => setDidClick(true)}>start</button>
			)}
		</>
	);
}

export default App;
