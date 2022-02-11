import React from "react";
import { createMachine, t } from "xstate";
import { assign } from "xstate/lib/actionTypes";

interface State {
	name: string;
	greeting: string;
	log: string[];
}

type Events =
	| { type: "setName"; data: string }
	| { type: "submit" }
	| { type: "resolve"; data: string }
	| { type: "reset" };

const machine = createMachine<State>(
	{
		schema: {
			context: t<State>(),
			events: t<Events>(),
		},
		context: {
			greeting: "Hello, what is your name?",
			name: "",
			log: [],
		},
		initial: "idle",
		states: {
			idle: {
				on: {},
			},
			requesting: {
				invoke: {
					id: "getGreeting",
					src: "getGreeting",
					onDone: {
						actions: ["log", "saveGreeting"],
					},
				},
			},
		},
	},
	{
		actions: {
			log: (ctx) => assign({}),
		},
	}
);

export const MachineDemo = () => {
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
