import "./styles.css";
import { HookDemo } from "./hookDemo.basic";
import { HookDemoWithReducer } from "./hookDemo.reducer";
import { MachineDemo } from './xstateDemo';

export default function App() {
	return (
		<div className="App">
			{/* <HookDemo /> */}

			{/* <HookDemoWithReducer /> */}

			<MachineDemo />
		</div>
	);
}
