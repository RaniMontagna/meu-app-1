import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useColaboradores from '../useColaboradores';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

export const AdicionarEditarColaborador = ({ adicionarEditarColaborador, setAdicionarEditarColaborador }) => {
  const { adicionarColaborador, editarColaborador } = useColaboradores();

  const callBackSucesso = useCallback(() => {
    setAdicionarEditarColaborador({ open: false });
  }, [setAdicionarEditarColaborador]);

  const _handleSubmit = (values) => {
    if (adicionarEditarColaborador.colaborador) {
      editarColaborador({ _id: adicionarEditarColaborador.colaborador._id, ...values }, callBackSucesso);
    } else {
      adicionarColaborador(values, callBackSucesso);
    }
  };

  const _initialValues = useMemo(() => {
    const colaborador = adicionarEditarColaborador.colaborador;

    if (adicionarEditarColaborador.colaborador) return colaborador;
    return {};
  }, [adicionarEditarColaborador.colaborador]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: _initialValues,
  });

  return (
    <Dialog
      header="Adicionar Colaborador"
      visible={adicionarEditarColaborador.open}
      style={{ width: '50vw' }}
      onHide={() => setAdicionarEditarColaborador({ open: false })}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        defaultValue={_initialValues}
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Nome*</label>
          <InputText
            className="form-control"
            type="text"
            name="nome"
            {...register('nome', {
              required: {
                value: true,
                message: 'O nome é obrigatório',
              },
              maxLength: {
                value: 50,
                message: 'O nome deve ter no máximo 50 caracteres',
              },
              minLength: {
                value: 2,
                message: 'O nome deve ter no mínimo 2 caracteres',
              },
            })}
          />
          <div>{errors.nome && <Message severity="error" text={errors?.nome?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Email*</label>
          <InputText
            className="form-control"
            type="text"
            name="email"
            {...register('email', {
              required: { value: true, message: 'O email é obrigatório!' },
              maxLength: { value: 100, message: 'O email pode ter no máximo 100 caracteres!' },
              minLength: { value: 10, message: 'O nome deve ter no mínimo 10 caracteres!' },
            })}
          />
          <div>{errors.nome && <Message severity="error" text={errors?.nome?.message}></Message>}</div>
        </div>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label>Senha*</label>
          <InputText
            className="form-control"
            type="text"
            name="senha"
            {...register('senha', {
              required: { value: true, message: 'A senha é obrigatório!' },
              maxLength: { value: 100, message: 'O email pode ter no máximo 100 caracteres!' },
              minLength: { value: 6, message: 'A senha deve conter no mínimo 6 caracteres!' },
            })}
          />
          <div>{errors.senha && <Message severity="error" text={errors?.senha?.message}></Message>}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setAdicionarEditarColaborador({ open: false })}
            className="p-button-text"
          />
          <Button label="Confirmar" icon="pi pi-check" type="submit" autoFocus />
        </div>
      </form>
    </Dialog>
  );
};

export default AdicionarEditarColaborador;
