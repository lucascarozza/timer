import styled from "styled-components";

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

  color: ${(props) => props.theme["blue-500"]};
`;
