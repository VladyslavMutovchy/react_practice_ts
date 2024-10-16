
import React, { useState, useEffect } from 'react';
import styles from './Registration.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { registration } from '../../store/storeAuth';
import { ThunkDispatch } from 'redux-thunk';
import { PayloadAction } from '@reduxjs/toolkit'; // Импортируем PayloadAction
import { RootState } from '../../store/store';

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
  const [isEmpty, setEmpty] = useState(!!validations.isEmpty);
  const [minLengthError, setMinLengthError] = useState(!!validations.minLength);
  const [isEmailError, setEmailError] = useState(!!validations.isEmailError);
  const [isValid, setValidity] = useState(false);
  // const [isEmpty, setEmpty] = useState(true);
  // const [minLengthError, setMinLengthError] = useState(true);
  // const [isEmailError, setEmailError] = useState(true);
  // const [isValid, setValidity] = useState(false);

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

interface RegistrationProps {
  registration: (formData: { email: string; password: string }, onSuccess: () => void, onFailure: () => void) => Promise<PayloadAction<any>>;
}

const Registration: React.FC<RegistrationProps> = ({ registration }) => {
  const navigate = useNavigate();

  const email = useInput('', {
    isEmpty: true,
    minLength: 3,
    isEmailError: true,
  });
  const password = useInput('', { isEmpty: true, minLength: 6 });
  const repeatPassword = useInput('', { isEmpty: true, minLength: 6 });

  const submitHandler = async () => {
    if (password.value !== repeatPassword.value) {
      alert('Пароли не совпадают');
      return;
    }

    const formData = {
      email: email.value,
      password: password.value,
    };

    try {
      await registration(
        formData,
        () => {
          navigate('/'); // используем navigate вместо history
        },
        () => {
          alert('Ошибка регистрации');
        },
      );
    } catch (error) {
      alert('Ошибка регистрации: ' + error); // Обработка ошибок
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form}>
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
          <div>Пароль</div>
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
        <label>
          <div>Повторите пароль</div>
          {repeatPassword.isDirty && repeatPassword.isEmpty && (
            <div style={{ color: '#ff0000' }}>Поле не может быть пустым</div>
          )}
          {repeatPassword.isDirty && repeatPassword.minLengthError && (
            <div style={{ color: '#ff0000' }}>Минимальная длина 6 символов</div>
          )}
          {repeatPassword.isDirty && password.value !== repeatPassword.value && (
            <div style={{ color: '#ff0000' }}>Пароли не совпадают</div>
          )}
          <input
            className={styles.input}
            value={repeatPassword.value}
            onChange={repeatPassword.onChange}
            onBlur={repeatPassword.onBlur}
            type="password"
          />
        </label>
        <button
          className={styles.btn}
          onClick={() => {
            console.log(
              '======>',
              password.value, 
              repeatPassword.value,
              email,
              password,
              repeatPassword
            )

            if (
              password.value === repeatPassword.value &&
              email.isValid &&
              password.isValid &&
              repeatPassword.isValid
            ) {
              submitHandler();
            } else {
              console.log('Ошибка валидации');
            }
          }}
          type="button"
        >
          Зарегистрироваться
        </button>
        <Link className={styles.btn} to="/">
          Назад
        </Link>
      </form>
    </div>
  );
};

// Используем ThunkDispatch для типизации
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, any>) => ({
  registration: (formData: { email: string; password: string }) => 
    dispatch(registration(formData)),
});

// Экспортируем компонент
export default connect(null, mapDispatchToProps)(Registration);
