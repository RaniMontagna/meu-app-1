import { useCallback, useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import useTipoRequisicao from '../useTipoRequisicao';

export const AdicionarEditarTipoRequisicao = ({ adicionarEditarTipoRequisicao, setAdicionarEditarTipoRequisicao }) => {
  const [tipoRequisicao, setTipoRequisicao] = useState({});
  const { adicionarTipoRequisicao, editarTipoRequisicao } = useTipoRequisicao();

  useEffect(() => {
    if (adicionarEditarTipoRequisicao.tipoRequisicao) {
      const tipoRequisicao = adicionarEditarTipoRequisicao.tipoRequisicao;
      setTipoRequisicao({ ...tipoRequisicao });
    }
  }, [adicionarEditarTipoRequisicao]);

  const _handleInputChange = (event) => {
    const { name, value } = event.target;
    setTipoRequisicao({ ...tipoRequisicao, [name]: value });
  };

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarTipoRequisicao({ open: false });
  }, [setAdicionarEditarTipoRequisicao]);

  const _handleSubmit = () => {
    if (adicionarEditarTipoRequisicao.tipoRequisicao) {
      editarTipoRequisicao(
        { _id: adicionarEditarTipoRequisicao.tipoRequisicao._id, ...tipoRequisicao },
        callBackSucesso
      );
    } else {
      adicionarTipoRequisicao(tipoRequisicao, callBackSucesso);
    }
  };

  return (
    <Dialog
      header="Adicionar Tipo de Requisição"
      visible={adicionarEditarTipoRequisicao.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarTipoRequisicao({ open: false })}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label>Descrição</label>
          <input
            className="form-control"
            type="text"
            name="descricao"
            value={tipoRequisicao.descricao}
            onChange={_handleInputChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarTipoRequisicao({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="button" onClick={_handleSubmit} autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarTipoRequisicao;
