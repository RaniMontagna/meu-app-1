import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import useApp from '../../Hooks/useApp';

const Navigation = () => {
  const navigate = useNavigate();
  const { toastRef, setToken } = useApp();

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/'),
    },
    {
      label: 'Cadastro',
      icon: 'pi pi-plus',
      items: [
        {
          label: 'Colaboradores',
          icon: 'pi pi-users',
          command: () => navigate('/colaboradores'),
        },
        {
          label: 'Solicitantes',
          icon: 'pi pi-users',
          command: () => navigate('/solicitantes'),
        },
        {
          label: 'Tipo de Requisição',
          icon: 'pi pi-box',
          command: () => navigate('/tipoRequisicao'),
        },
        {
          label: 'Requisição',
          icon: 'pi pi-send',
          command: () => navigate('/requisicao'),
        },
        {
          label: 'Andamento',
          icon: 'pi pi-cloud-download',
          command: () => navigate('/andamento'),
        },
        {
          label: 'Atividade',
          icon: 'pi pi-code',
          command: () => navigate('/atividade'),
        },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        sessionStorage.removeItem('token');
        setToken(null);
        toastRef.current.show({ severity: 'success', summary: 'Deslogado com sucesso', life: 3000 });
      },
    },
  ];

  return <Menubar model={items} />;
};

export default Navigation;
