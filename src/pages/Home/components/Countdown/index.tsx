// External libraries
import { useContext, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
// Context providers
import { CyclesContext } from "../../../../contexts/CyclesContext";
// Styled components
import { Colon, CountdownContainer } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    timeElapsedInSeconds,
    endCurrentCycle,
    setElapsedSeconds,
  } = useContext(CyclesContext);

  const totalTimeInSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
  const remainingTimeInSeconds = activeCycle
    ? totalTimeInSeconds - timeElapsedInSeconds
    : 0;
  const timeInMinutes = Math.floor(remainingTimeInSeconds / 60);
  const remainingSeconds = remainingTimeInSeconds % 60;
  const formattedMinutes = String(timeInMinutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      const interval = setInterval(() => {
        const newDate = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (newDate >= totalTimeInSeconds) {
          endCurrentCycle();
          setElapsedSeconds(totalTimeInSeconds);
          clearInterval(interval);
        } else {
          setElapsedSeconds(newDate);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [
    activeCycle,
    activeCycleId,
    totalTimeInSeconds,
    endCurrentCycle,
    setElapsedSeconds,
  ]);

  useEffect(() => {
    if (!activeCycle) {
      document.title = "Timer não iniciado";
      return;
    }
    document.title = `Timer: ${formattedMinutes}:${formattedSeconds} restante(s)`;
  }, [activeCycle, formattedMinutes, formattedSeconds]);

  return (
    <CountdownContainer>
      <span>{formattedMinutes[0]}</span>
      <span>{formattedMinutes[1]}</span>
      <Colon>:</Colon>
      <span>{formattedSeconds[0]}</span>
      <span>{formattedSeconds[1]}</span>
    </CountdownContainer>
  );
}
