import React from 'react';
import { useFormWithValidation } from '../../hooks/useForm';
import Container from '../../ui/container';
import styles from '../login/login.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, selectUserRequestMessage, selectUserRequestStatus } from '../../services/authSlice';

function ResetPasswordPage() {
  const { values, handleChange, errors, isValid, formRef } = useFormWithValidation();
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();
  const userRequestStatus = useSelector(selectUserRequestStatus);
  const userRequestMessage = useSelector(selectUserRequestMessage);

  const history = useHistory();
  const { state } = history.location;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(values));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoToLogin = () => {
    history.push('/login');
  };

  if (!state?.fromForgotPassword || userRequestMessage === 'Password successfully reset') {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef} noValidate>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type={showPassword ? 'text' : 'password'}
          required
          minLength={6}
          maxLength={12}
          placeholder="Введите новый пароль"
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
        <Input
          type="text"
          required
          placeholder="Введите код из письма"
          onChange={handleChange}
          value={values.token || ''}
          name="token"
          autoComplete="off"
          error={!!errors.token}
          errorText={errors.token}
          size="default"
          extraClass="mb-6"
          minLength={1}
        />
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          disabled={!isValid || userRequestStatus === 'loading'}
          extraClass="mb-20"
          htmlType="submit"
        >
          Войти
        </Button>
      </form>
      <nav>
        <div className={styles.navItem}>
          <p className="text text_type_main-default text_color_inactive mr-1">Вспомнили пароль?</p>
          <Button
            type="secondary"
            size="medium"
            extraClass={styles.navLink}
            htmlType="button"
            onClick={handleGoToLogin}
          >
            Войти
          </Button>
        </div>
      </nav>
    </Container>
  );
}

export default ResetPasswordPage;
