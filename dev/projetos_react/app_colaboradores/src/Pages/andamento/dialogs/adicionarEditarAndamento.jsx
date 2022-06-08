/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';
import moment from 'moment';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';

import useAndamento from '../useAndamento';
import useColaboradores from '../../../Hooks/useColaboradores';
import useColaboradoresHook from '../../colaboradores/useColaboradores';
import useAtividade from '../../../Hooks/useAtividade';
import useAtividadeHook from '../../atividade/useAtividade';

export const AdicionarEditarAndamento = ({ adicionarEditarAndamento, setAdicionarEditarAndamento }) => {
  const { adicionarAndamento, editarAndamento } = useAndamento();
  const [_, setAtualizaTela] = useState(false);

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

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarAndamento({ open: false });
  }, [setAdicionarEditarAndamento]);

  const _handleSubmit = (values) => {
    if (adicionarEditarAndamento.andamento) {
      editarAndamento({ _id: adicionarEditarAndamento.andamento._id, ...values }, callBackSucesso);
    } else {
      adicionarAndamento(values, callBackSucesso);
    }
  };

  const _formatDate = (data) => {
    const dataFormatada = moment(data).format('YYYY-MM-DDTHH:mm');
    return dataFormatada;
  };

  const _initialValues = useMemo(() => {
    const atividade = adicionarEditarAndamento.andamento;
    if (adicionarEditarAndamento.andamento)
      return {
        ...atividade,
        dataHora: _formatDate(atividade.dataHora),
      };
    return {};
  }, [adicionarEditarAndamento.andamento]);

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
      header="Adicionar Andamento"
      visible={adicionarEditarAndamento.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarAndamento({ open: false })}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        defaultValue={_initialValues}
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Data e Hora</label>
          <InputText
            className="form-control"
            type="datetime-local"
            name="dataHora"
            {...register('dataHora', {
              required: {
                value: true,
                message: 'Data hora é obrigatório',
              },
            })}
          />
          <div>{errors.dataHora && <Message severity="error" text={errors?.dataHora?.message}></Message>}</div>
        </div>
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
            placeholder="Selecione um colaborador"
          />
          <div>{errors.colaborador && <Message severity="error" text={errors?.colaborador?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Atividades</label>
          <Dropdown
            value={getValues()?.atividade?._id}
            options={atividade}
            optionValue="_id"
            optionLabel="titulo"
            {...register('atividade', {
              required: {
                value: true,
                message: 'A atividade é obrigatória',
              },
              onChange: (e) => {
                const a = atividade.find((atividade) => atividade._id === e.value);
                setValue('atividade', a);
                setAtualizaTela((current) => !current);
              },
            })}
            placeholder="Selecione uma atividade"
          />
          <div>{errors.atividade && <Message severity="error" text={errors?.atividade?.message}></Message>}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarAndamento({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="submit" autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarAndamento;
