// External libraries
import { createContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { X, Play } from "lucide-react";

// Internal utilities
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

// Styled components
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

const newCycleFormValidationSchema = z.object({
  task: z
    .string()
    .min(3, "A tarefa deve ter no mínimo 3 caracteres.")
    .max(40, "A tarefa não pode ter mais de 40 caracteres."),
  minutes: z
    .number()
    .min(5, "A tarefa deve durar no mínimo 5 minutos.")
    .max(60, "A tarefa não pode durar mais de 60 minutos."),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptionDate?: Date;
  conclusionDate?: Date;
}

interface CyclesContextState {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  timeElapsedInSeconds: number;
  endCurrentCycle: () => void;
  setTimeElapsedInSecondsFn: (seconds: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextState);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(5);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { task: "", minutes: 5 },
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = newCycleForm;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setTimeElapsedInSecondsFn(seconds: number) {
    setTimeElapsedInSeconds(seconds);
  }

  function endCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, conclusionDate: new Date() }
          : cycle
      )
    );
  }

  const task = watch("task");
  const minutes = watch("minutes");
  const isStartCountdownDisabled = isSubmitting || !task || !minutes;

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setTimeElapsedInSeconds(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, interruptionDate: new Date() }
          : cycle
      )
    );
    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            timeElapsedInSeconds,
            endCurrentCycle,
            setTimeElapsedInSecondsFn,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {!activeCycle ? (
          <StartCountdownButton
            disabled={isStartCountdownDisabled}
            type="submit"
          >
            <Play size={24} /> Começar
          </StartCountdownButton>
        ) : (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <X size={24} /> Interromper
          </StopCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
