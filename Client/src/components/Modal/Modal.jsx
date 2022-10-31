import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/Modal.module.css';
import clsx from 'clsx';

export default function Modal({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={clsx(styles.modal, 'flex justify-center content-center')}>
        <div className={clsx(styles.header, '')}>
          <a href='#' onClick={handleClose}>
            <button>Close</button>
          </a>
        </div>
        <div className={clsx(styles.body, '')}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
}
