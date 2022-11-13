import React from 'react';
import styles from './login.module.css';
import Container from '../../ui/container';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useFormWithValidation } from '../../hooks/useForm';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUserRequestError, selectUserRequestStatus } from '../../services/authSlice';

function LoginPage() {
  const { values, handleChange, errors, isValid, formRef } = useFormWithValidation();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const userRequestStatus = useSelector(selectUserRequestStatus);
  const userRequestError = useSelector(selectUserRequestError);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(values));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoToRegister = () => {
    history.push('/register');
  };

  const handleGoToForgotPassword = () => {
    history.push('/forgot-password');
  };

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef} noValidate>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <Input
          type="email"
          required
          placeholder="E-mail"
          autoComplete="username"
          onChange={handleChange}
          value={values.email || ''}
          name="email"
          error={!!errors.email}
          errorText={errors.email}
          size="default"
          extraClass="mb-6"
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          required
          minLength={6}
          maxLength={12}
          placeholder="Пароль"
          autoComplete="current-password"
          onChange={handleChange}
          value={values.password || ''}
          name="password"
          error={!!errors.password}
          errorText={errors.password}
          size="default"
          icon={showPassword ? 'HideIcon' : 'ShowIcon'}
          onIconClick={handleShowPassword}
          extraClass="mb-6"
        />
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          disabled={!isValid || userRequestStatus === 'pending'}
          htmlType="submit"
        >
          Войти
        </Button>
      </form>

      <p className={`text text_type_main-default ${styles.error}`}>{userRequestError}</p>

      <nav>
        <div className={styles.navItem}>
          <p className="text text_type_main-default text_color_inactive mb-4 mr-1">Вы — новый пользователь?</p>
          <Button
            type="secondary"
            size="medium"
            extraClass={styles.navLink}
            htmlType="button"
            onClick={handleGoToRegister}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.navItem}>
          <p className="text text_type_main-default text_color_inactive mr-1">Забыли пароль?</p>
          <Button
            type="secondary"
            size="medium"
            extraClass={styles.navLink}
            htmlType="button"
            onClick={handleGoToForgotPassword}
          >
            Восстановить пароль
          </Button>
        </div>
      </nav>
    </Container>
  );
}

export default LoginPage;
