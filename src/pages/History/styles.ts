import styled from "styled-components";

export const HistoryContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 2.5rem 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme["gray-100"]};
  }
`;

export const TableContainer = styled.div`
  flex: 1;
  margin-top: 2rem;
  overflow: auto;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    text-align: left;

    th {
      padding: 1rem;
      background: ${(props) => props.theme["gray-600"]};
      font-size: 0.875rem;
      line-height: 1.6;
      color: ${(props) => props.theme["gray-100"]};

      &:first-child {
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-top-right-radius: 8px;
      }
    }

    td {
      padding: 1rem;
      background: ${(props) => props.theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-800"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
        border-bottom-left-radius: 8px;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-bottom-right-radius: 8px;
      }
    }
  }
`;

const STATUS_COLORS = {
  yellow: "yellow-500",
  red: "red-500",
  green: "green-500",
} as const;

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 100%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`;
