import React, { useEffect } from 'react';

import styles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useFormWithValidation } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserRequestStatus, updateUser } from '../../services/authSlice';

function Profile() {
  const [isNameChanged, setNameChanged] = React.useState(false);
  const [isEmailChanged, setEmailChanged] = React.useState(false);
  const [isPasswordChanged, setPasswordChanged] = React.useState(false);
  const [isValuesChanged, setValuesChanged] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userRequestStatus = useSelector(selectUserRequestStatus);

  const { values, handleChange, resetFrom, errors, isValid, formRef } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(values));
  };

  const handleNameEdit = () => {
    setNameChanged(true);
  };

  const handleNameReset = () => {
    setNameChanged(false);
    resetFrom({ ...values, name: user.name });
  };

  const handleEmailEdit = () => {
    setEmailChanged(true);
  };

  const handleEmailReset = () => {
    setEmailChanged(false);
    resetFrom({ ...values, email: user.email });
  };

  const handlePasswordEdit = () => {
    setPasswordChanged(true);
  };

  const handlePasswordReset = () => {
    setPasswordChanged(false);
    resetFrom({ ...values, password: '' });
  };

  const handleReset = () => {
    resetFrom(user);

    setNameChanged(false);
    setEmailChanged(false);
    setPasswordChanged(false);
  };

  useEffect(() => {
    resetFrom(user);

    setNameChanged(false);
    setEmailChanged(false);
    setPasswordChanged(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (isNameChanged || isEmailChanged || isPasswordChanged) {
      setValuesChanged(true);
    } else {
      setValuesChanged(false);
    }
  }, [isNameChanged, isEmailChanged, isPasswordChanged]);

  return (
    <form className={styles.form} ref={formRef}>
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
        icon={isNameChanged ? 'CloseIcon' : 'EditIcon'}
        onIconClick={isNameChanged ? handleNameReset : handleNameEdit}
        disabled={!isNameChanged}
        extraClass="mb-6"
        minLength={2}
        maxLength={30}
      />
      <Input
        type="email"
        required
        placeholder="Логин"
        autoComplete="username"
        onChange={handleChange}
        value={values.email || ''}
        name="email"
        error={!!errors.email}
        errorText={errors.email}
        size="default"
        icon={isEmailChanged ? 'CloseIcon' : 'EditIcon'}
        onIconClick={isEmailChanged ? handleEmailReset : handleEmailEdit}
        disabled={!isEmailChanged}
        extraClass="mb-6"
      />
      <Input
        type="password"
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
        icon={isPasswordChanged ? 'CloseIcon' : 'EditIcon'}
        onIconClick={isPasswordChanged ? handlePasswordReset : handlePasswordEdit}
        disabled={!isPasswordChanged}
        extraClass="mb-6"
      />
      {isValuesChanged && (
        <div className={styles.buttons}>
          <Button type="secondary" size="medium" onClick={handleReset} htmlType="button">
            Отмена
          </Button>
          <Button
            type="primary"
            size="medium"
            onClick={handleSubmit}
            disabled={!isValid || userRequestStatus === 'loading'}
            htmlType="submit"
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default Profile;
