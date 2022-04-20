import './drawer.css';
import Botoes from './botoes/botoes';

const Drawer = () => {
  const logo = './static/logo_sistema.png';

  return (
    <div className="divMenu">
      <div className="divLogo">
        <img src={logo} alt={logo} style={{ width: '40px' }} />
      </div>
      <Botoes />
    </div>
  );
};

export default Drawer;
