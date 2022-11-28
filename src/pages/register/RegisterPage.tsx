import React, { FormEvent } from 'react';

import styles from './register.module.css';
import { useFormWithValidation } from '../../hooks/useForm';
import Container from '../../ui/container';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, register, selectUserRequestError } from '../../services/authSlice';
import { useAppDispatch } from '../../services/store';

function RegisterPage() {
  const { values, handleChange, errors, isValid, formRef } = useFormWithValidation();
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const userRequestError = useSelector(selectUserRequestError);

  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      register({
        email: values.email,
        password: values.password,
        name: values.name,
      })
    );
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoToLogin = () => {
    history.push('/login');
  };

  React.useEffect(() => {
    if (user) {
      history.replace({ pathname: '/' });
    }
  }, [user, history]);

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit} ref={formRef} noValidate>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          type="text"
          required
          placeholder="Имя"
          onChange={handleChange}
          value={values.name || ''}
          name="name"
          error={!!errors.name}
          errorText={errors.name}
          size="default"
          extraClass="mb-6"
          minLength={2}
          maxLength={30}
        />
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
          autoComplete="current-password"
          placeholder="Пароль"
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
        <Button type="primary" size="medium" onClick={handleSubmit} disabled={!isValid} htmlType="submit">
          Зарегистрироваться
        </Button>
      </form>

      <p className={`text text_type_main-default ${styles.error}`}>{userRequestError}</p>

      <nav>
        <div className={styles.navItem}>
          <p className="text text_type_main-default text_color_inactive mb-4 mr-1">Уже зарегистрированы?</p>
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

export default RegisterPage;
