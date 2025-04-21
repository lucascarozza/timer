import { Cycle } from "./reducer";

export enum ActionTypes {
  createNewCycle = "createNewCycle",
  interruptCurrentCycle = "interruptCurrentCycle",
  endCurrentCycle = "endCurrentCycle",
}

export function createNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.createNewCycle,
    payload: {
      newCycle,
    },
  };
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.interruptCurrentCycle,
  };
}

export function endCurrentCycleAction() {
  return {
    type: ActionTypes.endCurrentCycle,
  };
}
