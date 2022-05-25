import { useCallback, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import useColaboradores from '../useColaboradores';

export const AdicionarEditarColaborador = ({ adicionarEditarColaborador, setAdicionarEditarColaborador }) => {
  const [colaborador, setColaborador] = useState({});
  const { adicionarColaborador, editarColaborador } = useColaboradores();

  useEffect(() => {
    if (adicionarEditarColaborador.colaborador) {
      const colaborador = adicionarEditarColaborador.colaborador;
      setColaborador({ ...colaborador });
    }
  }, [adicionarEditarColaborador]);

  const _handleInputChange = (event) => {
    const { name, value } = event.target;
    setColaborador({ ...colaborador, [name]: value });
  };

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarColaborador({ open: false });
  }, [setAdicionarEditarColaborador]);

  const _handleSubmit = () => {
    if (adicionarEditarColaborador.colaborador) {
      editarColaborador({ _id: adicionarEditarColaborador.colaborador._id, ...colaborador }, callBackSucesso);
    } else {
      adicionarColaborador(colaborador, callBackSucesso);
    }
  };

  return (
    <Dialog
      header="Adicionar Colaborador"
      visible={adicionarEditarColaborador.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarColaborador({ open: false })}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarColaborador({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="button" onClick={_handleSubmit} autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarColaborador;
