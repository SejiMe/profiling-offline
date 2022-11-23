import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import Button from './Button';

const Popup = (props) => {
  const {
    openPopup,
    setOpenPopup,
    setClose,
    title,
    children,
    className,
    fullscreen,
  } = props;
  return (
    <Dialog
      sx={{
        bgcolor: 'transparent',
      }}
      open={openPopup}
      className={clsx('', className)}
      fullScreen={fullscreen}
    >
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
