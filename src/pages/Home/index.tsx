import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export function Home() {
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

  function handleStartCountdown(data: NewCycleFormData) {
    console.log(data);
    reset();
  }

  const task = watch("task");
  const minutes = watch("minutes");

  const isStartCountdownDisabled = isSubmitting || !task || !minutes;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartCountdown)}>
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
            placeholder="00"
            {...register("minutes", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Colon>:</Colon>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isStartCountdownDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
