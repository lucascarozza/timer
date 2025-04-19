import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";
import * as z from "zod";

import { Play } from "lucide-react";

import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Colon,
  StartCountdownButton,
  MinutesInput,
  TaskInput,
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
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutes: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalTimeInSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
  const remainingTimeInSeconds = activeCycle
    ? totalTimeInSeconds - timeElapsedInSeconds
    : 0;
  const timeInMinutes = Math.floor(remainingTimeInSeconds / 60);
  const remainingSeconds = remainingTimeInSeconds % 60;
  const formattedMinutes = String(timeInMinutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

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

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const newTime = differenceInSeconds(new Date(), activeCycle.startDate);
  
        if (newTime >= activeCycle.minutes * 60) {
          setTimeElapsedInSeconds(activeCycle.minutes * 60);
          clearInterval(interval);
        } else {
          setTimeElapsedInSeconds(newTime);
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [activeCycle]);

  useEffect(() => {
    if (!activeCycle) {
      document.title = "Timer não iniciado";
      return;
    }
    document.title = `Timer: ${formattedMinutes}:${formattedSeconds} restante(s)`;
  
    return () => {
      document.title = "Timer concluído";
    };
  }, [activeCycle, formattedMinutes, formattedSeconds]);
  

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Eu vou </label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="dê um nome para a sua tarefa"
            {...register("task")}
          />
          <datalist id="task-suggestions">
            <option value="brincar com meus gatos" />
            <option value="estudar programação" />
            <option value="cozinhar algo novo" />
            <option value="ler um livro de suspense" />
          </datalist>

          <label htmlFor="minutes">durante</label>
          <MinutesInput
            type="number"
            id="minutes"
            step={5}
            min={5}
            max={60}
            placeholder="0"
            {...register("minutes", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{formattedMinutes[0]}</span>
          <span>{formattedMinutes[1]}</span>
          <Colon>:</Colon>
          <span>{formattedSeconds[0]}</span>
          <span>{formattedSeconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isStartCountdownDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
