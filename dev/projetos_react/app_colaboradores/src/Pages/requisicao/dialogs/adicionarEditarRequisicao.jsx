import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import useRequisicao from '../useRequisicao';
import useTipoRequisicao from '../../../Hooks/useTipoRequisicao';
import useTipoRequisicaoHook from '../../tipoRequisicao/useTipoRequisicao';
import useSolicitantes from '../../../Hooks/useSolicitantes';
import useSolicitantesHook from '../../solicitantes/useSolicitantes';

export const AdicionarEditarRequisicao = ({ adicionarEditarRequisicao, setAdicionarEditarRequisicao }) => {
  const [requisicao, setRequisicao] = useState({});
  const { adicionarRequisicao, editarRequisicao } = useRequisicao();

  const { tipoRequisicao } = useTipoRequisicao();
  const { buscarTipoRequisicao } = useTipoRequisicaoHook();

  const { solicitantes } = useSolicitantes();
  const { buscarSolicitantes } = useSolicitantesHook();

  useEffect(() => {
    if (adicionarEditarRequisicao.requisicao) {
      const requisicao = adicionarEditarRequisicao.requisicao;
      setRequisicao({ ...requisicao });
    }
  }, [adicionarEditarRequisicao]);

  useEffect(() => {
    if (solicitantes.length === 0) {
      buscarSolicitantes();
    }
  }, [buscarSolicitantes, solicitantes.length]);

  useEffect(() => {
    if (tipoRequisicao.length === 0) {
      buscarTipoRequisicao();
    }
  }, [buscarTipoRequisicao, tipoRequisicao.length]);

  const _handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(event.target?.value);

    setRequisicao({ ...requisicao, [name]: value });
  };

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarRequisicao({ open: false });
  }, [setAdicionarEditarRequisicao]);

  const _handleSubmit = () => {
    if (adicionarEditarRequisicao.requisicao) {
      editarRequisicao({ _id: adicionarEditarRequisicao.requisicao._id, ...requisicao }, callBackSucesso);
    } else {
      adicionarRequisicao(requisicao, callBackSucesso);
    }
  };

  const _formatDate = (data) => {
    const dataFormatada = moment(data).utc().format('YYYY-MM-DDTHH:mm');
    return dataFormatada;
  };

  return (
    <Dialog
      header="Adicionar Requisições"
      visible={adicionarEditarRequisicao.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarRequisicao({ open: false })}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label>Título</label>
          <input
            className="form-control"
            type="text"
            name="titulo"
            value={requisicao.titulo}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <input
            className="form-control"
            type="text"
            name="descricao"
            value={requisicao.descricao}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Data de criação</label>
          <input
            className="form-control"
            type="datetime-local"
            name="dataHoraCriada"
            value={requisicao.prazoAtendimento && _formatDate(requisicao.dataHoraCriada)}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input
            className="form-control"
            type="text"
            name="status"
            value={requisicao.status}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Prazo de atendimento</label>
          <input
            className="form-control"
            type="datetime-local"
            name="prazoAtendimento"
            value={requisicao.prazoAtendimento && _formatDate(requisicao.prazoAtendimento)}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Solicitante</label>

          <Dropdown
            value={requisicao?.solicitante?._id}
            options={solicitantes}
            optionValue="_id"
            optionLabel="nome"
            onChange={(e) => {
              const solicitante = solicitantes.find((solicitante) => solicitante._id === e.value);
              setRequisicao((current) => ({ ...current, solicitante }));
            }}
            placeholder="Seleciona um solicitante"
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Tipo de requisição</label>
          <Dropdown
            value={requisicao?.tipoRequisicao?._id}
            options={tipoRequisicao}
            optionValue="_id"
            optionLabel="descricao"
            onChange={(e) => {
              const tipo = tipoRequisicao.find((tipoRequisicao) => tipoRequisicao._id === e.value);
              setRequisicao((current) => ({ ...current, tipoRequisicao: tipo }));
            }}
            placeholder="Seleciona uma requisição"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarRequisicao({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="button" onClick={_handleSubmit} autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarRequisicao;
