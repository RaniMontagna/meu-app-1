import { useTheme } from '@mui/material';
import Drawer from '../drawer/drawer';
import './public.css';

const Public = ({ children }) => {
  const { palette } = useTheme();

  return (
    <div className="Public" style={{ backgroundColor: palette.secondary.main }}>
      <Drawer />
      {children}
    </div>
  );
};

export default Public;
