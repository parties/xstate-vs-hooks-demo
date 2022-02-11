import React from "react";

const greet = async (value: string) =>
	new Promise<string>((resolve) => {
		setTimeout(() => {
			resolve(`Hello, ${value}!`);
		}, 2000);
	});

export const HookDemo = () => {
	const [name, setName] = React.useState<string>("Default");
	const [result, setResult] = React.useState<string>("");

	const handleSubmit = React.useCallback(
		(e) => {
			e.preventDefault();
			async function submit(value: string) {
				const greeting = await greet(value);
				setResult(greeting);
			}

			submit(name);
		},
		[name]
	);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button type="submit">Submit!</button>
			</form>
			<div>r: {result}</div>
		</>
	);
};
