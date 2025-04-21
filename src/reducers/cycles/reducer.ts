// External libraries
import { produce } from "immer";
// Internal utilities
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptionDate?: Date;
  conclusionDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.createNewCycle:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.interruptCurrentCycle: {
      const index = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (index < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[index].interruptionDate = new Date();
      });
    }
    case ActionTypes.endCurrentCycle: {
      const index = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (index < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[index].conclusionDate = new Date();
      });
    }
    default:
      return state;
  }
}
