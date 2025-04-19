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

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
`;

const baseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};

  background: transparent;

  color: ${(props) => props.theme["gray-100"]};
  font-weight: inherit;
  font-size: inherit;

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme["green-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }

  
`;

export const TaskInput = styled(baseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesInput = styled(baseInput)`
  width: 4rem;
`;

export const CountdownContainer = styled.div`
  display: flex;
  gap: 1rem;

  color: ${(props) => props.theme["gray-100"]};
  font-family: "Roboto Mono", monospace;
  font-size: 10.5rem;
  line-height: 8rem;

  span {
    padding: 2rem 1rem;
    border-radius: 8px;
    background: ${(props) => props.theme["gray-700"]};
  }
`;

export const Colon = styled.div`
  display: flex;
  justify-content: center;

  width: 4rem;
  padding: 2rem 0;
  padding-right: 0.8rem;
  overflow: hidden;

  color: ${(props) => props.theme["green-500"]};
`;

export const StartCountdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  padding: 1rem;

  border: 0;
  border-radius: 8px;

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
