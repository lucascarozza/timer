// External libraries
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
// Reducers
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  createNewCycleAction,
  endCurrentCycleAction,
  interruptCurrentCycleAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateNewCycleState {
  task: string;
  minutes: number;
}

interface CyclesContextState {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  timeElapsedInSeconds: number;
  endCurrentCycle: () => void;
  setElapsedSeconds: (seconds: number) => void;
  createNewCycle: (data: CreateNewCycleState) => void;
  interruptCurrentCycle: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextState);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    { cycles: [], activeCycleId: null },
    (initialState) => {
      const storedState = localStorage.getItem("@timer:cycles-state-1.0.0");
      if (storedState) {
        return JSON.parse(storedState);
      }
      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 5;
  });

  useEffect(() => {
    localStorage.setItem(
      "@timer:cycles-state-1.0.0",
      JSON.stringify(cyclesState)
    );
  }, [cyclesState]);

  function setElapsedSeconds(seconds: number) {
    setTimeElapsedInSeconds(seconds);
  }

  function createNewCycle({ task, minutes }: CreateNewCycleState) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const newCycle: Cycle = { id, task, minutes, startDate: new Date() };

    dispatch(createNewCycleAction(newCycle));
    setTimeElapsedInSeconds(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  function endCurrentCycle() {
    dispatch(endCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        timeElapsedInSeconds,
        endCurrentCycle,
        setElapsedSeconds,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
