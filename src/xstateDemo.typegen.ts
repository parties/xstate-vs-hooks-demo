// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    log: "submit" | "setName" | "reset" | "done.invoke.getGreeting";
    setName: "setName";
    resetState: "reset";
    saveGreeting: "done.invoke.getGreeting";
    setWaitingGreeting: "submit";
  };
  internalEvents: {
    "done.invoke.getGreeting": {
      type: "done.invoke.getGreeting";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
    "error.platform.getGreeting": {
      type: "error.platform.getGreeting";
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    getGreeting: "done.invoke.getGreeting";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getGreeting: "submit";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "idle" | "requesting";
  tags: never;
}
