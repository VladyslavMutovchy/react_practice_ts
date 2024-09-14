import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.svg';

const Home: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.h1}>
        Home Page
        <img className={styles.logo} alt="logo" src={logo} />
      </h1>
      <Link className={styles.link_btn} to="/about">
        About
      </Link>
      <Link className={styles.link_btn} to="/tasks">
        Tasks list
      </Link>
      <Link className={styles.link_btn} to="/team-search">
        IBench Team Search
      </Link>
    </div>
  );
};

export default Home;
