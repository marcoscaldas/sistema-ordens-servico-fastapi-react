import { useState } from 'react';

const inicial = { cliente: '', equipamento: '', descricao: '', prioridade: 'media' };

export default function FormularioOrdem({ onCadastrar }) {

  const [form, setForm] = useState(inicial);
  const [salvando, setSalvando] = useState(false);

  function alterar(evento) {
    const { name, value } = evento.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setSalvando(true);
    try {
      const sucesso = await onCadastrar(form);
      if (sucesso) setForm(inicial);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <section className="painel">
      <h2>Nova ordem de serviço</h2>
      <form onSubmit={enviar} className="formulario">

        <label>Cliente
          <input name="cliente" value={form.cliente} onChange={alterar} required maxLength={100} />
        </label>

        <label>Equipamento
          <input name="equipamento" value={form.equipamento} onChange={alterar} required maxLength={100} />
        </label>
        
        <label className="campo-largo">Descrição do problema
          <textarea name="descricao" value={form.descricao} onChange={alterar} required maxLength={500} rows={3} />
        </label>

        <label>Prioridade
          <select name="prioridade" value={form.prioridade} onChange={alterar}>
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </label>

        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : 'Cadastrar ordem'}
        </button>

      </form>
    </section>
  );
}
