export default function ListaOrdens({ ordens, carregando }) {
  return (
    <section className="painel">
      <h2>Ordens cadastradas</h2>
      {carregando ? (
        <p>Carregando ordens...</p>
      ) : ordens.length === 0 ? (
        <p>Nenhuma ordem cadastrada.</p>
      ) : (
        <div className="tabela-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Equipamento</th>
                <th>Descrição</th>
                <th>Prioridade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ordens.map((ordem) => (
                <tr key={ordem.id}>
                  <td>{ordem.id}</td>
                  <td>{ordem.cliente}</td>
                  <td>{ordem.equipamento}</td>
                  <td>{ordem.descricao}</td>
                  <td>{ordem.prioridade}</td>
                  <td>{ordem.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
