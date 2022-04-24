import React from 'react';
import './actions.css';

import { Menu, MenuItem } from '@mui/material';
import { MdOutlineMenuOpen } from 'react-icons/md';

const Actions = ({ actions }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 8px 0 0' }}>
        <MdOutlineMenuOpen style={{ cursor: 'pointer' }} onClick={handleClick} size={28} />
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} className="menu">
        {actions.map((it) => {
          return (
            <MenuItem key={Math.random()} onClick={() => it.action()}>
              {it.icon}
              <span style={{ marginLeft: 8 }}>{it.label}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default Actions;
