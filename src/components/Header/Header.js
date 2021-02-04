import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.appBar}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h1 className={styles.primaryHdg}>Fantastical Bestiary</h1>
    </header>
  );
}

export default Header;
