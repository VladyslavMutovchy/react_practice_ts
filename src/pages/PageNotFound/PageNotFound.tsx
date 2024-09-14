
import React from 'react';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import styles from './PageNotFound.module.css'

const PageNotFound: React.FC = () => {
    return (
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Page not found</h1>
          <div className={styles.errorCode}>404</div>
          <p>We can’t seem to find the page you’re looking for.</p>
          <GoBackBtn/>
        </div>
      );
};

export default PageNotFound;
