import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavigationList = styled.ul`
  display: flex;
`;

export const NavigationItem = styled.li`
  width: 3rem;
  height: 3rem;

  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme["green-500"]};
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;