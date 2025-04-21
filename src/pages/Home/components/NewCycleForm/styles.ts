import styled from "styled-components";

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

  &:not(:disabled):focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme["blue-500"]};
  }

  &:disabled {
    cursor: not-allowed;
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
