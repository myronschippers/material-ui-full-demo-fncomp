import React from 'react';
import styles from './AppLayout.module.css';

// CUSTOM COMPONENTS
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AppLayout(props) {
  return (
    <div className={styles.site}>
      <div className={styles['site-hd']}>
        <Header />
      </div>
      <div className={styles['site-bd']}>
        <div className="container">{props.children}</div>
      </div>
      <div className={styles['site-ft']}>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
