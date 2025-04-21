// External libraries
import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
// Context providers
import { CyclesContext } from "../../contexts/CyclesContext";
// Styled components
import { HistoryContainer, Status, TableContainer } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutes} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {(() => {
                      switch (true) {
                        case !!cycle.conclusionDate:
                          return <Status statusColor="green">Concluído</Status>;
                        case !!cycle.interruptionDate:
                          return (
                            <Status statusColor="red">Interrompido</Status>
                          );
                        default:
                          return (
                            <Status statusColor="yellow">Em andamento</Status>
                          );
                      }
                    })()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
    </HistoryContainer>
  );
}
