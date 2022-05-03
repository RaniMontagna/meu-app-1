import React, { useContext } from 'react';
import ColaboradoresContext from './colaboradoresContext';
import useColaboradores from './useColaboradores';

const ColaboradorForm = () => {
  const { editando, setEditando } = useContext(ColaboradoresContext);
  const { adicionarColaborador, editarColaborador } = useColaboradores();

  const [colaborador, setColaborador] = React.useState({});

  React.useEffect(() => {
    if (editando.colaborador) {
      const colaborador = editando.colaborador;
      setColaborador({ ...colaborador });
    }
  }, [editando]);

  const _handleInputChange = (event) => {
    const { name, value } = event.target;
    setColaborador({ ...colaborador, [name]: value });
  };

  const _handleSubmit = () => {
    if (editando.colaborador) {
      editarColaborador({ _id: editando.colaborador._id, ...colaborador });
    } else {
      adicionarColaborador(colaborador);
    }
  };

  return (
    <form>
      <div className="form-group">
        <label>Nome</label>
        <input
          className="form-control"
          type="text"
          name="nome"
          value={colaborador.nome}
          onChange={_handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control"
          type="text"
          name="email"
          value={colaborador.email}
          onChange={_handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Senha</label>
        <input
          className="form-control"
          type="text"
          name="senha"
          value={colaborador.senha}
          onChange={_handleInputChange}
        />
      </div>
      <div className="form-group">
        <button type="button" onClick={_handleSubmit} className="btn btn-primary btn-sm">
          Salvar
        </button>
        <button type="button" onClick={() => setEditando({ open: false })} className="btn btn-primary btn-sm">
          Cancelar
        </button>
      </div>
    </form>
  );
};
export default ColaboradorForm;
