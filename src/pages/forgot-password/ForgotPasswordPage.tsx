import React, { FormEvent } from 'react';

import styles from './forgot-password.module.css';
import { useFormWithValidation } from '../../hooks/useForm';
import { Redirect, useHistory } from 'react-router-dom';
import Container from '../../ui/container';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, selectUserRequestMessage, selectUserRequestStatus } from '../../services/authSlice';

function ForgotPasswordPage() {
  const { values, handleChange, errors, isValid, formRef } = useFormWithValidation();

  const dispatch = useDispatch();

  const history = useHistory();
  const userRequestStatus = useSelector(selectUserRequestStatus);
  const userRequestMessage = useSelector(selectUserRequestMessage);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // @ts-ignore
    dispatch(forgotPassword(values));
  };

  const handleGoToLogin = () => {
    history.push('/login');
  };

  if (userRequestMessage === 'Reset email sent') {
    return <Redirect to={{ pathname: '/reset-password', state: { fromForgotPassword: true } }} />;
  }

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef} noValidate>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="email"
          required
          placeholder="Укажите e-mail"
          onChange={handleChange}
          value={values.email || ''}
          name="email"
          error={!!errors.email}
          errorText={errors.email}
          size="default"
          extraClass="mb-6"
        />
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          disabled={!isValid || userRequestStatus === 'loading'}
          extraClass="mb-20"
          htmlType="submit"
        >
          Восстановить
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

export default ForgotPasswordPage;
