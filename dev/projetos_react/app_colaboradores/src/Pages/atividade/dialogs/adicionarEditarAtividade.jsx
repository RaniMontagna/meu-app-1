/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

import useAtividade from '../useAtividade';
import useRequisicao from '../../../Hooks/useRequisicao';
import useRequisicaoHook from '../../requisicao/useRequisicao';

import useColaboradores from '../../../Hooks/useColaboradores';
import useColaboradoresHook from '../../colaboradores/useColaboradores';

export const AdicionarEditarAtividade = ({ adicionarEditarAtividade, setAdicionarEditarAtividade }) => {
  const { adicionarAtividade, editarAtividade } = useAtividade();
  const [_, setAtualizaTela] = useState(false);

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

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarAtividade({ open: false });
  }, [setAdicionarEditarAtividade]);

  const _handleSubmit = (values) => {
    if (adicionarEditarAtividade.atividade) {
      editarAtividade({ _id: adicionarEditarAtividade.atividade._id, ...values }, callBackSucesso);
    } else {
      adicionarAtividade(values, callBackSucesso);
    }
  };

  const _formatDate = (data) => {
    const dataFormatada = moment(data).format('YYYY-MM-DDTHH:mm');
    return dataFormatada;
  };

  const _initialValues = useMemo(() => {
    const atividade = adicionarEditarAtividade.atividade;
    if (adicionarEditarAtividade.atividade)
      return {
        ...atividade,
        prazo: _formatDate(atividade.prazo),
        agendaInicio: _formatDate(atividade.agendaInicio),
        dataHoraTermino: _formatDate(atividade.dataHoraTermino),
      };
    return {};
  }, [adicionarEditarAtividade.atividade]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: _initialValues,
  });

  return (
    <Dialog
      header="Adicionar Atividade"
      visible={adicionarEditarAtividade.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarAtividade({ open: false })}
      defaultValue={_initialValues}
      onSubmit={handleSubmit(_handleSubmit)}
    >
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Titulo</label>
          <InputText
            className="form-control"
            type="text"
            name="titulo"
            {...register('titulo', {
              required: {
                value: true,
                message: 'O titulo é obrigatório',
              },
              maxLength: {
                value: 50,
                message: 'O titulo deve ter no máximo 50 caracteres',
              },
              minLength: {
                value: 2,
                message: 'O titulo deve ter no mínimo 2 caracteres',
              },
            })}
          />
          <div>{errors.titulo && <Message severity="error" text={errors?.titulo?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Descrição</label>
          <InputText
            className="form-control"
            type="text"
            name="descricao"
            {...register('descricao', {
              required: {
                value: true,
                message: 'O descrição é obrigatório',
              },
              maxLength: {
                value: 200,
                message: 'O descrição deve ter no máximo 200 caracteres',
              },
              minLength: {
                value: 2,
                message: 'O descrição deve ter no mínimo 2 caracteres',
              },
            })}
          />
          <div>{errors.descricao && <Message severity="error" text={errors?.descricao?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Status</label>
          <InputText
            className="form-control"
            type="text"
            name="status"
            {...register('status', {
              required: {
                value: true,
                message: 'O status é obrigatório',
              },
              maxLength: {
                value: 20,
                message: 'O status deve ter no máximo 20 caracteres',
              },
              minLength: {
                value: 2,
                message: 'O status deve ter no mínimo 2 caracteres',
              },
            })}
          />
          <div>{errors.status && <Message severity="error" text={errors?.status?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Prazo</label>
          <InputText
            className="form-control"
            type="datetime-local"
            name="prazo"
            {...register('prazo', {
              required: {
                value: true,
                message: 'O prazo é obrigatório',
              },
            })}
          />
          <div>{errors.prazo && <Message severity="error" text={errors?.prazo?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Agenda Ínicio</label>
          <InputText
            className="form-control"
            type="datetime-local"
            name="agendaInicio"
            {...register('agendaInicio', {
              required: {
                value: true,
                message: 'Inicio da agenda é obrigatório',
              },
            })}
          />
          <div>{errors.agendaInicio && <Message severity="error" text={errors?.agendaInicio?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Data Término</label>
          <InputText
            className="form-control"
            type="datetime-local"
            name="dataHoraTermino"
            {...register('dataHoraTermino')}
          />
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Requisições</label>
          <Dropdown
            value={getValues()?.requisicao?._id}
            options={requisicao}
            optionValue="_id"
            optionLabel="titulo"
            {...register('requisicao', {
              required: {
                value: true,
                message: 'O tipo de requisição é obrigatório',
              },
              onChange: (e) => {
                const r = requisicao.find((requisicao) => requisicao._id === e.value);
                setValue('requisicao', r);
                setAtualizaTela((current) => !current);
              },
            })}
            placeholder="Selecione uma requisição"
          />
          <div>{errors.requisicao && <Message severity="error" text={errors?.requisicao?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Colaboradores</label>
          <Dropdown
            value={getValues()?.colaborador?._id}
            options={colaboradores}
            optionValue="_id"
            optionLabel="nome"
            {...register('colaborador', {
              required: {
                value: true,
                message: 'O tipo de colaborador é obrigatório',
              },
              onChange: (e) => {
                const colaborador = colaboradores.find((colaborador) => colaborador._id === e.value);
                setValue('colaborador', colaborador);
                setAtualizaTela((current) => !current);
              },
            })}
            placeholder="Seleciona um colaborador"
          />
          <div>{errors.colaborador && <Message severity="error" text={errors?.colaborador?.message}></Message>}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarAtividade({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="submit" autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarAtividade;
