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

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            onFocus={(e) => e.target.setAttribute("list", "task-suggestions")}
            placeholder="Dê um nome para o seu projeto"
          />
          <datalist id="task-suggestions">
            <option value="banana" />
            <option value="maçã" />
            <option value="laranja" />
          </datalist>

          <label htmlFor="minutes">durante</label>
          <MinutesInput
            type="number"
            step={5}
            min={5}
            max={60}
            id="minutes"
            placeholder="00"
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

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
