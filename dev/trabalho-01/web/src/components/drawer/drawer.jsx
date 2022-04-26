import './drawer.css';
import Botoes from './botoes/botoes';
import { GiBookmark } from 'react-icons/gi';

const Drawer = () => {
  return (
    <div className="divMenu">
      <div className="divLogo">
        <GiBookmark size={40} />
      </div>
      <Botoes />
    </div>
  );
};

export default Drawer;
