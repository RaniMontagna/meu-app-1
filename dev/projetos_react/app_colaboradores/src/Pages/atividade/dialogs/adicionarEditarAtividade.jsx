import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import useAtividade from '../useAtividade';
import { Dropdown } from 'primereact/dropdown';

import useRequisicao from '../../../Hooks/useRequisicao';
import useRequisicaoHook from '../../requisicao/useRequisicao';

import useColaboradores from '../../../Hooks/useColaboradores';
import useColaboradoresHook from '../../colaboradores/useColaboradores';

export const AdicionarEditarAtividade = ({ adicionarEditarAtividade, setAdicionarEditarAtividade }) => {
  const [atividade, setAtividade] = useState({});
  const { adicionarAtividade, editarAtividade } = useAtividade();

  const { requisicao } = useRequisicao();
  const { buscarRequisicao } = useRequisicaoHook();

  const { colaboradores } = useColaboradores();
  const { buscarColaboradores } = useColaboradoresHook();

  useEffect(() => {
    if (requisicao.length === 0) {
      buscarRequisicao();
    }
  }, [buscarRequisicao, requisicao.length]);

  useEffect(() => {
    if (colaboradores?.length === 0) {
      buscarColaboradores();
    }
  }, [buscarColaboradores, colaboradores.length]);

  useEffect(() => {
    if (adicionarEditarAtividade.atividade) {
      const atividade = adicionarEditarAtividade.atividade;
      setAtividade({ ...atividade });
    }
  }, [adicionarEditarAtividade]);

  const _handleInputChange = (event) => {
    const { name, value } = event.target;
    setAtividade({ ...atividade, [name]: value });
  };

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarAtividade({ open: false });
  }, [setAdicionarEditarAtividade]);

  const _handleSubmit = () => {
    if (adicionarEditarAtividade.atividade) {
      editarAtividade({ _id: adicionarEditarAtividade.atividade._id, ...atividade }, callBackSucesso);
    } else {
      adicionarAtividade(atividade, callBackSucesso);
    }
  };

  const _formatDate = (data) => {
    const dataFormatada = moment(data).utc().format('YYYY-MM-DDTHH:mm');
    return dataFormatada;
  };

  return (
    <Dialog
      header="Adicionar Atividade"
      visible={adicionarEditarAtividade.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarAtividade({ open: false })}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label>Titulo</label>
          <input
            className="form-control"
            type="text"
            name="titulo"
            value={atividade.titulo}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <input
            className="form-control"
            type="text"
            name="descricao"
            value={atividade.descricao}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input
            className="form-control"
            type="text"
            name="status"
            value={atividade.status}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Prazo</label>
          <input
            className="form-control"
            type="datetime-local"
            name="prazo"
            value={atividade.prazo && _formatDate(atividade.prazo)}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Agenda Ínicio</label>
          <input
            className="form-control"
            type="datetime-local"
            name="agendaInicio"
            value={atividade.agendaInicio && _formatDate(atividade.agendaInicio)}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Data Término</label>
          <input
            className="form-control"
            type="datetime-local"
            name="dataHoraTermino"
            value={atividade.dataHoraTermino && _formatDate(atividade.dataHoraTermino)}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Requisições</label>
          <Dropdown
            value={atividade?.requisicao?._id}
            options={requisicao}
            optionValue="_id"
            optionLabel="titulo"
            onChange={(e) => {
              const r = requisicao.find((requisicao) => requisicao._id === e.value);
              setAtividade((current) => ({ ...current, requisicao: r }));
            }}
            placeholder="Selecione uma atividade"
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Colaboradores</label>
          <Dropdown
            value={atividade?.colaborador?._id}
            options={colaboradores}
            optionValue="_id"
            optionLabel="nome"
            onChange={(e) => {
              const colaborador = colaboradores.find((colaborador) => colaborador._id === e.value);
              setAtividade((current) => ({ ...current, colaborador }));
            }}
            placeholder="Seleciona uma requisição"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarAtividade({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="button" onClick={_handleSubmit} autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarAtividade;
