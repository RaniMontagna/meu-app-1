import { useCallback, useMemo } from 'react';
import useTipoRequisicao from '../useTipoRequisicao';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useForm } from 'react-hook-form';

export const AdicionarEditarTipoRequisicao = ({ adicionarEditarTipoRequisicao, setAdicionarEditarTipoRequisicao }) => {
  const { adicionarTipoRequisicao, editarTipoRequisicao } = useTipoRequisicao();

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarTipoRequisicao({ open: false });
  }, [setAdicionarEditarTipoRequisicao]);

  const _handleSubmit = (values) => {
    if (adicionarEditarTipoRequisicao.tipoRequisicao) {
      editarTipoRequisicao({ _id: adicionarEditarTipoRequisicao.tipoRequisicao._id, ...values }, callBackSucesso);
    } else {
      adicionarTipoRequisicao(values, callBackSucesso);
    }
  };

  const _initialValues = useMemo(() => {
    const tipoRequisicao = adicionarEditarTipoRequisicao.tipoRequisicao;
    if (adicionarEditarTipoRequisicao.tipoRequisicao) return tipoRequisicao;
    return {};
  }, [adicionarEditarTipoRequisicao.tipoRequisicao]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: _initialValues,
  });

  return (
    <Dialog
      header="Adicionar Tipo de Requisição"
      visible={adicionarEditarTipoRequisicao.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarTipoRequisicao({ open: false })}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        defaultValue={_initialValues}
        onSubmit={handleSubmit(_handleSubmit)}
      >
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarTipoRequisicao({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="submit" autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarTipoRequisicao;
