import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/storeAuth';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store/store';
import { PayloadAction } from '@reduxjs/toolkit'; // Импортируем PayloadAction
import styles from './Login.module.css';

// Определяем типы для валидации
interface Validations {
  isEmpty: boolean;
  minLength?: number;
  isEmailError?: boolean;
}

interface UseValidationReturn {
  isEmpty: boolean;
  minLengthError: boolean;
  isEmailError: boolean;
  isValid: boolean;
}

// Валидация
const useValidation = (value: string, validations: Validations): UseValidationReturn => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(true);
  const [isEmailError, setEmailError] = useState(true);
  const [isValid, setValidity] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < (validations[validation] as number)
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmailError':
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        default:
          break;
      }
    }
  }, [value, validations]);

  useEffect(() => {
    setValidity(!(isEmpty || isEmailError || minLengthError));
  }, [isEmpty, isEmailError, minLengthError]);

  return { isEmpty, minLengthError, isEmailError, isValid };
};

// Интерфейсы для useInput
interface UseInputReturn {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isDirty: boolean;
  isEmpty: boolean;
  minLengthError: boolean;
  isEmailError: boolean;
  isValid: boolean;
}

const useInput = (initialValue: string, validations: Validations): UseInputReturn => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

interface LoginProps {
  login: (formData: { email: string; password: string }) => Promise<PayloadAction<any>>; // Измените на PayloadAction
}

// Компонент Login
const Login: React.FC<LoginProps> = ({ login }) => {
  const navigate = useNavigate();

  const email = useInput('', {
    isEmpty: true,
    minLength: 3,
    isEmailError: true,
  });

  const password = useInput('', { isEmpty: true, minLength: 6 });

  const submitHandler = async () => {
    const formData = {
      email: email.value,
      password: password.value,
    };

    try {
      await login(formData);
      navigate('/'); // Используем navigate вместо history
    } catch (error) {
      alert('Ошибка входа');
    }
  };

  const renderLogined = () => (
    <>
      <h1 className={styles.title}>Login</h1>
      <label>
        <div>Email</div>
        {email.isDirty && email.isEmpty && (
          <div style={{ color: '#ff0000' }}>Поле не может быть пустым</div>
        )}
        {email.isDirty && email.minLengthError && (
          <div style={{ color: '#ff0000' }}>Минимальная длина 3 символа</div>
        )}
        {email.isDirty && email.isEmailError && (
          <div style={{ color: '#ff0000' }}>Некорректный email</div>
        )}
        <input
          className={styles.input}
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          type="email"
        />
      </label>
      <label>
        <div>Password</div>
        {password.isDirty && password.isEmpty && (
          <div style={{ color: '#ff0000' }}>Поле не может быть пустым</div>
        )}
        {password.isDirty && password.minLengthError && (
          <div style={{ color: '#ff0000' }}>Минимальная длина 6 символов</div>
        )}
        <input
          className={styles.input}
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          type="password"
        />
      </label>
      <button
        className={styles.btn}
        onClick={() => {
          console.log('===LOGIN VALIDATION', email.isValid, password.isValid);
          if (password.value &&
            email.isValid &&
            password.isValid
           ) {
            console.log('Ошибка валидации');
          } else {
            submitHandler();
          }
        }}
        type="button"
      >
        Войти
      </button>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        {renderLogined()}
        <GoBackBtn />
      </form>
    </div>
  );
};

// Используем ThunkDispatch для типизации
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, any>) => ({
  login: (formData: { email: string; password: string }) => dispatch(login(formData)),
});

// Экспортируем компонент
export default connect(null, mapDispatchToProps)(Login);
