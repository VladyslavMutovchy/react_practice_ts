import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import logo from './../../assets/logo.svg';
import { logout } from '../../store/storeAuth';

const Home: React.FC = () => {
  const userLogined = localStorage.getItem('user');
  
  const dispatch = useDispatch();
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    dispatch(logout() as any);
  };

    return userLogined !== null ? (
      <div className={styles.wrapper}>
      <h1 className={styles.h1}>
        Home Page
        <img className={styles.logo} alt="logo" src={logo} />
      </h1>
      <Link className={styles.link_btn} to="/about">
        About
      </Link>
      <Link className={styles.link_btn} to="/task_list">
        Tasks list
      </Link>
      <Link className={styles.link_btn} to="/admin-list">
        Admin list
      </Link>
      <button className={styles.link_btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  ):(<div className={styles.wrapper}>
      <h1 className={styles.h1}>
        Home Page
        <img className={styles.logo} alt="logo" src={logo} />
      </h1>
      <Link className={styles.link_btn} to="/registration">
        Registration
      </Link>
      <Link className={styles.link_btn} to="/login">
        Login
      </Link>
    </div>);
};

export default Home;
