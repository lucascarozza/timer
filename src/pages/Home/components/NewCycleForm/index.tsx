// External libraries
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
// Context providers
import { CyclesContext } from "../..";
// Styled components
import { FormContainer, TaskInput, MinutesInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Eu vou </label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        placeholder="0"
        {...register("minutes", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
