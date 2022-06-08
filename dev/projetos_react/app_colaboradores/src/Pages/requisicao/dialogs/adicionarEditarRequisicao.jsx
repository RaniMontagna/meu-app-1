/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

import useRequisicao from '../useRequisicao';
import useTipoRequisicao from '../../../Hooks/useTipoRequisicao';
import useTipoRequisicaoHook from '../../tipoRequisicao/useTipoRequisicao';
import useSolicitantes from '../../../Hooks/useSolicitantes';
import useSolicitantesHook from '../../solicitantes/useSolicitantes';

export const AdicionarEditarRequisicao = ({ adicionarEditarRequisicao, setAdicionarEditarRequisicao }) => {
  const { adicionarRequisicao, editarRequisicao } = useRequisicao();

  const [_, setAtualizaTela] = useState(false);

  const { tipoRequisicao } = useTipoRequisicao();
  const { buscarTipoRequisicao } = useTipoRequisicaoHook();

  const { solicitantes } = useSolicitantes();
  const { buscarSolicitantes } = useSolicitantesHook();

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

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarRequisicao({ open: false });
  }, [setAdicionarEditarRequisicao]);

  const _handleSubmit = (values) => {
    if (adicionarEditarRequisicao.requisicao) {
      editarRequisicao({ _id: adicionarEditarRequisicao.requisicao._id, ...values }, callBackSucesso);
    } else {
      adicionarRequisicao(values, callBackSucesso);
    }
  };

  const _formatDate = (data) => {
    const dataFormatada = moment(data).format('YYYY-MM-DDTHH:mm');
    return dataFormatada;
  };

  const _initialValues = useMemo(() => {
    const requisicao = adicionarEditarRequisicao.requisicao;
    if (adicionarEditarRequisicao.requisicao)
      return {
        ...requisicao,
        dataHoraCriada: _formatDate(requisicao.dataHoraCriada),
        prazoAtendimento: _formatDate(requisicao.prazoAtendimento),
      };
    return {};
  }, [adicionarEditarRequisicao.requisicao]);

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
      header="Adicionar Requisições"
      visible={adicionarEditarRequisicao.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarRequisicao({ open: false })}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        defaultValue={_initialValues}
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Título</label>
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
          <label>Data de criação</label>
          <InputText
            className="form-control"
            type="datetime-local"
            name="dataHoraCriada"
            {...register('dataHoraCriada', {
              required: {
                value: true,
                message: 'A data e hora são obrigatório',
              },
            })}
          />
          <div>
            {errors.dataHoraCriada && <Message severity="error" text={errors?.dataHoraCriada?.message}></Message>}
          </div>
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
          <label>Prazo de atendimento</label>
          <InputText
            className="form-control"
            type="datetime-local"
            name="prazoAtendimento"
            {...register('prazoAtendimento', {
              required: {
                value: true,
                message: 'O prazo de atendimento é obrigatório',
              },
            })}
          />
          <div>
            {errors.prazoAtendimento && <Message severity="error" text={errors?.prazoAtendimento?.message}></Message>}
          </div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Solicitante</label>
          <Dropdown
            value={getValues()?.solicitante?._id}
            options={solicitantes}
            optionValue="_id"
            optionLabel="nome"
            {...register('solicitante', {
              required: {
                value: true,
                message: 'O solicitante é obrigatório',
              },
              onChange: (e) => {
                const solicitante = solicitantes.find((solicitante) => solicitante._id === e.value);
                setValue('solicitante', solicitante);
                setAtualizaTela((current) => !current);
              },
            })}
            placeholder="Seleciona um solicitante"
            {...register('solicitante', {
              required: {
                value: true,
                message: 'O solicitante é obrigatório',
              },
            })}
          />
          <div>{errors.solicitante && <Message severity="error" text={errors?.solicitante?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Tipo de requisição</label>
          <Dropdown
            value={getValues()?.tipoRequisicao?._id}
            options={tipoRequisicao}
            optionValue="_id"
            optionLabel="descricao"
            placeholder="Seleciona uma requisição"
            {...register('tipoRequisicao', {
              required: {
                value: true,
                message: 'O tipo de requisição é obrigatório',
              },
              onChange: (e) => {
                const tipo = tipoRequisicao.find((tipoRequisicao) => tipoRequisicao._id === e.value);
                setValue('tipoRequisicao', tipo);
                setAtualizaTela((current) => !current);
              },
            })}
          />
          <div>
            {errors.tipoRequisicao && <Message severity="error" text={errors?.tipoRequisicao?.message}></Message>}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarRequisicao({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="submit" autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarRequisicao;
