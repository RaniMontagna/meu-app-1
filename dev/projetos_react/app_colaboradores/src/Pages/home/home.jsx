import { decodeToken } from 'react-jwt';

const Home = () => {
  //buscar token
  const token = sessionStorage.getItem('token');

  //decodificar token
  const decodedToken = decodeToken(token);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 58px)',
      }}
    >
      <h2>{decodedToken?.nome && `${decodedToken?.nome}, `}Bem-vindo ao sistema!</h2>
    </div>
  );
};

export default Home;
