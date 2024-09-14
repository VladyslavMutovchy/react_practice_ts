import React from 'react';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import Counter from '../../components/Counter/Counter';
import styles from './About.module.css'


const About: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>About Page</h1>
      <Counter/>
      <GoBackBtn/>
    </div>
  );
};

export default About;
