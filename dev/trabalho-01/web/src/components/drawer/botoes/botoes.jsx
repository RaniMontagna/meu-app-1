import { useNavigate } from 'react-router-dom';
import '../drawer.css';

import { BiCollection, BiTask, BiUser, BiCategoryAlt } from 'react-icons/bi';
import Tooltip from '@mui/material/Tooltip';

const Botoes = () => {
  const navigate = useNavigate();

  return (
    <div className="divBotoes">
      <div>
        <Tooltip title={<h3>Dashboard</h3>} placement="right" arrow>
          <button className="botaoDrawer" onClick={() => navigate('/')}>
            <BiCategoryAlt size={24} />
          </button>
        </Tooltip>
        <Tooltip title={<h3>Tarefas</h3>} placement="right" arrow>
          <button className="botaoDrawer" onClick={() => navigate('/tarefas')}>
            <BiTask size={24} />
          </button>
        </Tooltip>
        <Tooltip title={<h3>Responsáveis</h3>} placement="right" arrow>
          <button className="botaoDrawer" onClick={() => navigate('/responsaveis')}>
            <BiUser size={24} />
          </button>
        </Tooltip>
        <Tooltip title={<h3>Categorias</h3>} placement="right" arrow>
          <button className="botaoDrawer" onClick={() => navigate('/categorias')}>
            <BiCollection size={24} />
          </button>
        </Tooltip>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}></div>
    </div>
  );
};

export default Botoes;
