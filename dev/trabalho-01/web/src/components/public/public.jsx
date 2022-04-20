import Drawer from '../drawer/drawer';
import './public.css';

const Public = ({ children }) => {
  return (
    <div className="Public">
      <Drawer />
      {children}
    </div>
  );
};

export default Public;
