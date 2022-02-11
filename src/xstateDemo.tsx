import { useMachine } from "@xstate/react";
import React from "react";
import { createMachine, t, assign } from "xstate";
import DebouncedInput from "react-debounce-input";

interface State {
  name: string;
  greeting: string;
  log: string[];
}

const initialState: State = {
  greeting: "Hello, what is your name?",
  name: "",
  log: [] as string[],
};

type Events =
  | { type: "setName"; data: string }
  | { type: "submit" }
  | { type: "resolve"; data: string }
  | { type: "reset" }
  | { type: "done.invoke.getGreeting"; data: string };

const machine = createMachine(
  {
    schema: {
      context: t<State>(),
      events: t<Events>(),
    },
    tsTypes: {} as import("./xstateDemo.typegen").Typegen0,
    context: initialState,
    initial: "idle",
    states: {
      idle: {
        on: {
          submit: {
            actions: "log",
            target: "requesting",
          },
          setName: {
            actions: ["log", "setName"],
          },
          reset: {
            actions: ["log", "resetState"],
          },
        },
      },
      requesting: {
        entry: ["setWaitingGreeting"],
        invoke: {
          id: "getGreeting",
          src: "getGreeting",
          onDone: {
            actions: ["log", "saveGreeting"],
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      log: assign({
        log: (ctx, ev) => [...ctx.log, ev.type],
      }),
      saveGreeting: assign({
        greeting: (_ctx, ev) => ev.data,
      }),
      setName: assign({
        name: (ctx, ev) => ev.data,
      }),
      setWaitingGreeting: assign({
        greeting: () => "Hmm...",
      }),
      resetState: assign({
        ...initialState,
        // preserve existing log
        log: (ctx) => ctx.log,
      }),
    },
    services: {
      // @ts-ignore
      getGreeting: async (ctx, ev) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(`Hello, ${ctx.name}!`);
          }, 2000);
        }),
    },
  },
);

export const MachineDemo = () => {
  const [state, dispatch] = useMachine(machine, { devTools: true });

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: "submit" });
    },
    [dispatch],
  );

  const handleNameChange = React.useCallback(
    (e) => dispatch({ type: "setName", data: e.target.value }),
    [dispatch],
  );

  const handleReset = React.useCallback(() => dispatch({ type: "reset" }), []);

  return (
    <>
      <h1>{state.context.greeting}</h1>
      <form onSubmit={handleSubmit}>
        {/* @ts-ignore */}
        <DebouncedInput
          minLength={2}
          debounceTimeout={500}
          type="text"
          value={state.context.name}
          placeholder="My name is..."
          onChange={handleNameChange}
        />
        <button disabled={state.matches("requesting")} type="submit">
          Submit!
        </button>
      </form>

      <br />

      <button onClick={handleReset}>Reset</button>

      <pre>{JSON.stringify(state.context, null, 2)}</pre>
    </>
  );
};
