import { HistoryContainer, Status, TableContainer } from "./styles";

export function History() {
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
            <tr>
              <td>Fazer exercícios</td>
              <td>30 minutos</td>
              <td>Há 1 hora</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Assistir aula online</td>
              <td>50 minutos</td>
              <td>Há 4 horas</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>

            <tr>
              <td>Preparar almoço</td>
              <td>30 minutos</td>
              <td>Há 5 horas</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Organizar documentos</td>
              <td>25 minutos</td>
              <td>Há 1 dia</td>
              <td>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>

            <tr>
              <td>Estudar programação</td>
              <td>45 minutos</td>
              <td>Há 2 dias</td>
              <td>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>

            <tr>
              <td>Limpar a casa</td>
              <td>60 minutos</td>
              <td>Há 3 dias</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </HistoryContainer>
  );
}
