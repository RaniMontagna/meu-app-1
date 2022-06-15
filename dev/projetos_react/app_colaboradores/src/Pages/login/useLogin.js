import useApp from '../../Hooks/useApp';
import { useHelper } from '../../Services/api';

export const useLogin = () => {
  const { toastRef, setToken } = useApp();
  const { api } = useHelper();

  const handleLogin = async ({ email, senha }) => {
    try {
      const res = await api.post('/login', { email, senha });

      if (res.data) {
        sessionStorage.setItem('token', res.data);
        setToken(res.data);

        toastRef.current.show({ severity: 'success', summary: 'Login realizado com sucesso', life: 3000 });
      }
    } catch (err) {
      console.log(err);
      toastRef.current.show({ severity: 'error', summary: 'Erro ao realizar login', life: 3000 });
    }
  };

  return {
    handleLogin,
  };
};
