import { createContext, ReactNode, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptionDate?: Date;
  conclusionDate?: Date;
}

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
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(5);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setElapsedSeconds(seconds: number) {
    setTimeElapsedInSeconds(seconds);
  }

  function endCurrentCycle() {
    setCycles((prevCycles) =>
      prevCycles.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, conclusionDate: new Date() }
          : cycle
      )
    );
  }

  function createNewCycle({ task, minutes }: CreateNewCycleState) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const newCycle: Cycle = {
      id,
      task,
      minutes,
      startDate: new Date(),
    };

    setCycles((prevCycles) => [...prevCycles, newCycle]);
    setActiveCycleId(id);
    setTimeElapsedInSeconds(0);
  }

  function interruptCurrentCycle() {
    setCycles((prevCycles) =>
      prevCycles.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, interruptionDate: new Date() }
          : cycle
      )
    );
    setActiveCycleId(null);
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
