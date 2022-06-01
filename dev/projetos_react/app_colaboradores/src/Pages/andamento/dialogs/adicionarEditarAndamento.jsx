import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import useAndamento from '../useAndamento';
import useColaboradores from '../../../Hooks/useColaboradores';
import useColaboradoresHook from '../../colaboradores/useColaboradores';
import useAtividade from '../../../Hooks/useAtividade';
import useAtividadeHook from '../../atividade/useAtividade';

export const AdicionarEditarAndamento = ({ adicionarEditarAndamento, setAdicionarEditarAndamento }) => {
  const [andamento, setAndamento] = useState({});
  const { adicionarAndamento, editarAndamento } = useAndamento();

  const { colaboradores } = useColaboradores();
  const { buscarColaboradores } = useColaboradoresHook();

  const { atividade } = useAtividade();
  const { buscarAtividade } = useAtividadeHook();

  useEffect(() => {
    if (atividade.length === 0) {
      buscarAtividade();
    }
  }, [buscarAtividade, atividade.length]);

  useEffect(() => {
    if (colaboradores?.length === 0) {
      buscarColaboradores();
    }
  }, [buscarColaboradores, colaboradores.length]);

  useEffect(() => {
    if (adicionarEditarAndamento.andamento) {
      const andamento = adicionarEditarAndamento.andamento;
      setAndamento({ ...andamento });
    }
  }, [adicionarEditarAndamento]);

  const _handleInputChange = (event) => {
    const { name, value } = event.target;
    setAndamento({ ...andamento, [name]: value });
  };

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarAndamento({ open: false });
  }, [setAdicionarEditarAndamento]);

  const _handleSubmit = () => {
    if (adicionarEditarAndamento.andamento) {
      editarAndamento({ _id: adicionarEditarAndamento.andamento._id, ...andamento }, callBackSucesso);
    } else {
      adicionarAndamento(andamento, callBackSucesso);
    }
  };

  const _formatDate = (data) => {
    const dataFormatada = moment(data).utc().format('YYYY-MM-DDTHH:mm');
    return dataFormatada;
  };

  return (
    <Dialog
      header="Adicionar Andamento"
      visible={adicionarEditarAndamento.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarAndamento({ open: false })}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label>Data e Hora</label>
          <input
            className="form-control"
            type="datetime-local"
            name="dataHora"
            value={andamento.dataHora && _formatDate(andamento.dataHora)}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Titulo</label>
          <input
            className="form-control"
            type="text"
            name="titulo"
            value={andamento.titulo}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <input
            className="form-control"
            type="text"
            name="descricao"
            value={andamento.descricao}
            onChange={_handleInputChange}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Colaboradores</label>
          <Dropdown
            value={andamento?.colaborador?._id}
            options={colaboradores}
            optionValue="_id"
            optionLabel="nome"
            onChange={(e) => {
              const colaborador = colaboradores.find((colaborador) => colaborador._id === e.value);
              setAndamento((current) => ({ ...current, colaborador }));
            }}
            placeholder="Seleciona uma requisição"
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Atividades</label>
          <Dropdown
            value={andamento?.atividade?._id}
            options={atividade}
            optionValue="_id"
            optionLabel="titulo"
            onChange={(e) => {
              const a = atividade.find((atividade) => atividade._id === e.value);
              setAndamento((current) => ({ ...current, atividade: a }));
            }}
            placeholder="Selecione uma atividade"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarAndamento({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="button" onClick={_handleSubmit} autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarAndamento;
