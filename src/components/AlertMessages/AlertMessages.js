import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AlertMessages.module.css';

function AlertMessages() {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.error);

  const closeError = (event) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  render() {
    return (
      <div className={styles.alertFrame}>
        {error.message &&
          <div className={styles.alertPanel}>
            {error.message}
            <button onClick={closeError}>close</button>
          </div>
        }
      </div>
    );
  }
}

export default AlertMessages;
