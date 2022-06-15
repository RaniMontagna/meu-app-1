import axios from 'axios';
import useApp from '../Hooks/useApp';

export const useHelper = () => {
  const { token } = useApp();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': token,
    },
  });

  return { api };
};
