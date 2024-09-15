// pages/About.tsx

import React from 'react';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import Counter from '../../components/Counter/Counter';
import styles from './About.module.css'
import TestComponent from '../../components/TestComponent/TestComponent';


const About: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>About Page</h1>
      <Counter/>
      <TestComponent/>
      <GoBackBtn/>
    </div>
  );
};

export default About;
