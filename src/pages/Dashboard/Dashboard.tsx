// pages/About.tsx

import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';


import styles from './Dashboard.module.css';

const About: React.FC = () => {
  const [randomNumber1, setRandomNumber] = useState<number>(1);
  const [randomNumber2, setRandomNumber2] = useState<number>(1);
  const [randomItemValue, setRandomItemValue] = useState<string>('=');
  const [light, setLight] = useState<boolean>(true);
  const [userCompare, setUserCompare] = useState<boolean|null>(null);
  const [hideColor, setHideColor] = useState<boolean>(true);
  const [answerAvailableNum, setAnswerAvailableNum] = useState<boolean>(true);
  const [scoreTrue, setScoreTrue] = useState<number>(0);
  const [scoreFalse, setScoreFalse] = useState<number>(0);

  useEffect(() => {
    compare();
  }, [randomNumber1, randomNumber2, randomItemValue]);

  const refresh = ():void => {
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
    setRandomNumber2(Math.floor(Math.random() * 20) + 1);
    const items = ['=', '<', '>'];
    setRandomItemValue(items[Math.floor(Math.random() * items.length)]);
    setAnswerAvailableNum(true);
    setHideColor(true); 
    setUserCompare(null); 
  };

  const compare = ():void => {
    let compareLight:boolean = false;

    if (randomItemValue === '=') {
      compareLight = randomNumber1 === randomNumber2;
    } else if (randomItemValue === '>') {
      compareLight = randomNumber1 > randomNumber2;
    } else if (randomItemValue === '<') {
      compareLight = randomNumber1 < randomNumber2;
    }

    setLight(compareLight);
  };

  const handleUserCompare = (userChoice: boolean):void => {
    setUserCompare(userChoice);
    setHideColor(false);

    if (answerAvailableNum) { 
      if (light === userChoice) {
        setScoreTrue(scoreTrue + 1);
      } else {
        setScoreFalse(scoreFalse + 1);
      }
      setAnswerAvailableNum(false);
    }
  };

  const reset = ():void => {
    setScoreTrue( 0);
    setScoreFalse( 0);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <>
          <div className={styles.nr1}>{randomNumber1}</div>
          <div className={styles.nr1}>{randomItemValue}</div>
          <div className={styles.nr1}>{randomNumber2}</div>
          <div className={styles.nr1}>
            <div
              className={classNames({
                [styles.green]: light === userCompare,
                [styles.red]: light !== userCompare,
                [styles.reset]: hideColor,
              })}
            />
          </div>
          <button
            onClick={() => handleUserCompare(true)}
            className={styles.btn}
          >
            Yes
          </button>
          <button
            onClick={() => handleUserCompare(false)}
            className={styles.btn}
          >
            No
          </button>
          <button
            onClick={refresh}
            className={styles.btn}
          >
            Refresh
          </button>
        </>
        <>
          <div className={styles.answer}>
            <div>Truth: {scoreTrue}</div>
            <div>False: {scoreFalse}</div>
          </div>
          <button
            onClick={reset}
            className={styles.btn}
          >
            Reset score
          </button>
        </>
      </div>
      <GoBackBtn/>
    </>
  );
};

export default About;
