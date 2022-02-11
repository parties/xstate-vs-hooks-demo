import React from "react";
import DebouncedInput from "react-debounce-input";

const greet = async (value: string) =>
	new Promise<string>((resolve) => {
		setTimeout(() => {
			resolve(`Hello, ${value}!`);
		}, 2000);
	});

interface State {
	name: string;
	greeting: string;
	isLoading: boolean;
	log: string[];
}

type Actions =
	| { type: "setName"; data: string }
	| { type: "submit" }
	| { type: "resolve"; data: string }
	| { type: "reset" };

const initialState: State = {
	name: "",
	greeting: "Hello, what is your name?",
	isLoading: false,
	log: [],
};

function reducer(state: State, action: Actions): State {
	switch (action.type) {
		case "submit":
			return {
				...state,
				isLoading: true,
				greeting: "Hmm...",
				log: [...state.log, "[submit]"],
			};
		case "resolve":
			return {
				...state,
				isLoading: false,
				greeting: action.data,
				log: [...state.log, "[resolve]"],
			};
		case "setName":
			return {
				...state,
				name: action.data,
				log: [...state.log, "[setName]"],
			};
		case "reset":
			return {
				...initialState,
				log: [...state.log, "[reset]"],
			};
		default:
			return state;
	}
}

export const HookDemoWithReducer = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const handleSubmit = React.useCallback(
		(e) => {
			e.preventDefault();
			async function submit(value: string) {
				// set loading indicator
				dispatch({ type: "submit" });

				// await async response
				const greeting = await greet(value);

				// update greeting
				dispatch({
					type: "resolve",
					data: greeting,
				});
			}

			submit(state.name);
		},
		[state.name]
	);

	return (
		<>
			<h1>{state.greeting}</h1>
			<form onSubmit={handleSubmit}>
				<DebouncedInput
					minLength={2}
					debounceTimeout={500}
					type="text"
					value={state.name}
					placeholder="My name is..."
					onChange={(e) => dispatch({ type: "setName", data: e.target.value })}
				/>
				<button disabled={state.isLoading} type="submit">
					Submit!
				</button>
			</form>

			<br />

			<button onClick={() => dispatch({ type: "reset" })}>Reset</button>

			<pre>{JSON.stringify(state, null, 2)}</pre>
		</>
	);
};
