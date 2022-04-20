import { BiCollection, BiTask, BiUser, BiCategoryAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import '../drawer.css';

const Botoes = () => {
  const navigate = useNavigate();

  return (
    <div className="divBotoes">
      <div>
        <button className="botaoDrawer" onClick={() => navigate('/')}>
          <BiCategoryAlt size={24} />
        </button>
        <button className="botaoDrawer" onClick={() => navigate('/tarefas')}>
          <BiTask size={24} />
        </button>
        <button className="botaoDrawer" onClick={() => navigate('/responsaveis')}>
          <BiUser size={24} />
        </button>
        <button className="botaoDrawer" onClick={() => navigate('/categorias')}>
          <BiCollection size={24} />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}></div>
    </div>
  );
};

export default Botoes;
