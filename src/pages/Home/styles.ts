import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  cursor: default;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const TaskName = styled.p`
display: flex;
justify-content: center;
align-items: center;

height: 2.5rem;
width: 100%;

font-size: 1.125rem;
font-weight: bold;
font-style: italic;
`

export const baseCountdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  padding: 1rem;

  border: 0;
  border-radius: 8px;
`;

export const StartCountdownButton = styled(baseCountdownButton)`
  background: ${(props) => props.theme["green-500"]};

  color: ${(props) => props.theme["gray-100"]};
  font-weight: bold;

  &:disabled {
    background: ${(props) => props.theme["gray-600"]};
    color: ${(props) => props.theme["gray-500"]};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(baseCountdownButton)`
background: ${(props) => props.theme["red-500"]};

color: ${(props) => props.theme["gray-100"]};
font-weight: bold;

&:disabled {
  background: ${(props) => props.theme["gray-600"]};
  color: ${(props) => props.theme["gray-500"]};
  cursor: not-allowed;
}

&:not(:disabled):hover {
  background: ${(props) => props.theme["red-700"]};
}`;