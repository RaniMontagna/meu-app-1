import { useCallback, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import useSolicitantes from '../useSolicitantes';

export const AdicionarEditarSolicitante = ({ adicionarEditarSolicitante, setAdicionarEditarSolicitante }) => {
  const [solicitante, setSolicitante] = useState({});
  const { adicionarSolicitante, editarSolicitante } = useSolicitantes();

  useEffect(() => {
    if (adicionarEditarSolicitante.solicitante) {
      const solicitante = adicionarEditarSolicitante.solicitante;
      setSolicitante({ ...solicitante });
    }
  }, [adicionarEditarSolicitante]);

  const _handleInputChange = (event) => {
    const { name, value } = event.target;
    setSolicitante({ ...solicitante, [name]: value });
  };

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarSolicitante({ open: false });
  }, [setAdicionarEditarSolicitante]);

  const _handleSubmit = () => {
    if (adicionarEditarSolicitante.solicitante) {
      editarSolicitante({ _id: adicionarEditarSolicitante.solicitante._id, ...solicitante }, callBackSucesso);
    } else {
      adicionarSolicitante(solicitante, callBackSucesso);
    }
  };

  return (
    <Dialog
      header="Adicionar Solicitante"
      visible={adicionarEditarSolicitante.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarSolicitante({ open: false })}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label>Nome</label>
          <input
            className="form-control"
            type="text"
            name="nome"
            value={solicitante.nome}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={solicitante.email}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            className="form-control"
            type="text"
            name="senha"
            value={solicitante.senha}
            onChange={_handleInputChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarSolicitante({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="button" onClick={_handleSubmit} autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarSolicitante;
