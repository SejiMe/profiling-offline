import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import Button from './Button';

const Popup = (props) => {
  const { openPopup, setOpenPopup, setClose, title, children, ...other } =
    props;
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div className='grid grid-cols-6'>
          <h2 className='col-span-4'>{title}</h2>
          <div className='col-span-1'></div>
          {setOpenPopup && (
            <Button
              type='button'
              className='bg-red-300'
              onClick={() => setOpenPopup(false)}
            >
              Close
            </Button>
          )}
          {
            // Google logout and close popup for request
            setClose && (
              <Button type='button' onClick={setClose} className='bg-red-300'>
                Cancel
              </Button>
            )
          }
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
