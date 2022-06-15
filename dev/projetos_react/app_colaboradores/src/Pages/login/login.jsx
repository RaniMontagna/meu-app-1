import * as styled from './login.styles';
import { useLogin } from './useLogin';

import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { Message } from 'primereact/message';

const Login = () => {
  const { handleLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <styled.DivLogin>
          <div
            className="form-group"
            style={{ display: 'flex', width: '80%', flexDirection: 'column', gap: '8px', maxWidth: '570px' }}
          >
            <label>Email</label>
            <InputText
              className="form-control"
              type="email"
              name="email"
              {...register('email', {
                required: {
                  value: true,
                  message: 'O email é obrigatório',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'O email é inválido',
                },
              })}
            />
            <div>{errors.email && <Message severity="error" text={errors?.email?.message}></Message>}</div>
          </div>
          <div
            className="form-group"
            style={{ display: 'flex', width: '80%', flexDirection: 'column', gap: '8px', maxWidth: '570px' }}
          >
            <label>Senha</label>
            <InputText
              className="form-control"
              type="password"
              name="senha"
              {...register('senha', {
                required: { value: true, message: 'A senha é obrigatório!' },
              })}
            />
            <div>{errors.senha && <Message severity="error" text={errors?.senha?.message}></Message>}</div>
          </div>
          <styled.ButtonEnter type="submit">Entrar</styled.ButtonEnter>
        </styled.DivLogin>

        <styled.DivLayout>
          <styled.DivIlustracao>
            {/* Logo */}
            <img src="./welcome.svg" alt="loginIllustration"></img>
          </styled.DivIlustracao>
          <h1>Seja bem vindo!</h1>
          <h2>Trabalho de finalização da displina de tópicos especiais em desenvolvimento de sistemas</h2>
        </styled.DivLayout>
      </div>
    </form>
  );
};

export default Login;
