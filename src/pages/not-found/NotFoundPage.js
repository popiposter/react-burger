import React from 'react';

import styles from './not-found.module.css';

import { ReactComponent as NotFoundIcon } from '../../images/not-found-icon.svg';
import { useHistory } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Container from '../../ui/container';

function NotFoundPage() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoHome = () => {
    history.push('/');
  };

  return (
    <Container>
      <NotFoundIcon className={styles.icon} />
      <h1 className="text text_type_main-large mt-8">404</h1>
      <p className="text text_type_main-default">Страница не найдена</p>
      <div>
        <Button htmlType="button" type="secondary" size="medium" onClick={handleGoBack}>
          Назад
        </Button>
        <Button htmlType="button" type="secondary" size="medium" onClick={handleGoHome}>
          Домой
        </Button>
      </div>
    </Container>
  );
}

export default NotFoundPage;
