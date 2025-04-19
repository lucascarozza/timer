// External libraries
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Play } from "lucide-react";
// Internal utilities
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
// Context providers
import { CyclesContext } from "../../contexts/CyclesContext";
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

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);
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

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task");
  const minutes = watch("minutes");
  const isStartCountdownDisabled = isSubmitting || !task || !minutes;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {!activeCycle ? (
          <StartCountdownButton
            disabled={isStartCountdownDisabled}
            type="submit"
          >
            <Play size={24} /> Começar
          </StartCountdownButton>
        ) : (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <X size={24} /> Interromper
          </StopCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
