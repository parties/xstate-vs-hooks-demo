import "./styles.css";
import { HookDemo } from "./hookDemo.basic";
import { HookDemoWithReducer } from "./hookDemo.reducer";

export default function App() {
	return (
		<div className="App">
			{/* <HookDemo /> */}
			<HookDemoWithReducer />
		</div>
	);
}
