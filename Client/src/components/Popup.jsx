import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import Button from './Button';

const Popup = (props) => {
  const { openPopup, setOpenPopup, title, children, ...other } = props;
  return (
    <Dialog fullScreen open={openPopup}>
      <DialogTitle>
        <div>
          <h2>{title}</h2>
          <Button type='button' onClick={() => setOpenPopup(false)}>
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
