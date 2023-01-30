import React, { useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';

import { TYPE_INGREDIENTS } from '../../utils/constants';
import BurgerIngredientsByType from '../burger-ingredients-by-type';
import { useSelector } from 'react-redux';
import {
  selectBuns,
  selectIngredientsError,
  selectIngredientsStatus,
  selectMains,
  selectSauces,
} from '../../services/burgerIngredientsSlice';
import Spinner from '../../ui/spinner';
import CenteredBox from '../../ui/centered-box';
import { InView } from 'react-intersection-observer';

function BurgerIngredients() {
  const [isBunsInView, setIsBunsInView] = React.useState(false);
  const [isSaucesInView, setIsSaucesInView] = React.useState(false);
  const [isMainsInView, setIsMainsInView] = React.useState(false);

  const currentTab = React.useMemo(() => {
    if (isBunsInView) {
      return TYPE_INGREDIENTS.bun.name;
    } else if (isSaucesInView) {
      return TYPE_INGREDIENTS.sauce.name;
    } else if (isMainsInView) {
      return TYPE_INGREDIENTS.main.name;
    }
  }, [isBunsInView, isSaucesInView, isMainsInView]);

  const ingredientsStatus = useSelector(selectIngredientsStatus);
  const ingredientsError = useSelector(selectIngredientsError);

  const buns = useSelector(selectBuns);
  const sauces = useSelector(selectSauces);
  const mains = useSelector(selectMains);

  const handleTabClick = useCallback(() => {}, []);

  const content =
    ingredientsStatus === 'loading' ? (
      <CenteredBox>
        <Spinner />
      </CenteredBox>
    ) : ingredientsStatus === 'failed' ? (
      <CenteredBox>
        <p className="text text_type_main-medium mb-15">Не получить ингредиенты 😖</p>
        <p className="text text_type_main-default">{ingredientsError}</p>
      </CenteredBox>
    ) : ingredientsStatus === 'succeeded' ? (
      <>
        <div className={`${styles.tabs} pb-10`}>
          <Tab active={currentTab === TYPE_INGREDIENTS.bun.name} value="bun" onClick={handleTabClick}>
            {TYPE_INGREDIENTS.bun.title}
          </Tab>
          <Tab active={currentTab === TYPE_INGREDIENTS.sauce.name} value="sauce" onClick={handleTabClick}>
            {TYPE_INGREDIENTS.sauce.title}
          </Tab>
          <Tab active={currentTab === TYPE_INGREDIENTS.main.name} value="main" onClick={handleTabClick}>
            {TYPE_INGREDIENTS.main.title}
          </Tab>
        </div>

        <div className={styles.ingredients} data-test="ingredients">
          <InView as="div" onChange={(inView) => setIsBunsInView(inView)}>
            <BurgerIngredientsByType ingredients={buns} type={TYPE_INGREDIENTS.bun} />
          </InView>
          <InView as="div" onChange={(inView) => setIsSaucesInView(inView)}>
            <BurgerIngredientsByType ingredients={sauces} type={TYPE_INGREDIENTS.sauce} />
          </InView>
          <InView as="div" onChange={(inView) => setIsMainsInView(inView)}>
            <BurgerIngredientsByType ingredients={mains} type={TYPE_INGREDIENTS.main} />
          </InView>
        </div>
      </>
    ) : null;

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      {content}
    </section>
  );
}

export default BurgerIngredients;
