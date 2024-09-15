import React from 'react';
import { useState } from 'react';
import styles from './Counter.module.css';

const Counter: React.FC = () => {
  const [increment, setIncrement] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <h1>Counter</h1>
      <button onClick={() => setIncrement(increment + 1)}>+1</button>
      <button onClick={() => setIncrement(increment - 1)}>-1</button>
      <button onClick={() => setIncrement(0)}>res</button>
      <p>{increment}</p>
    </div>
  );
};

export default Counter;
