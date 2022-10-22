import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';

import { TYPE_INGREDIENTS } from '../../constants/constants';
import BurgerIngredientsByType from './burger-ingredients-by-type';
import IngredientDetailsModal from '../modals/ingredient-details-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIngredients,
  selectIngredient,
  selectIngredientsByType,
  selectIngredientsError,
  selectIngredientsStatus,
  selectSelectedIngredient,
} from './burgerIngredientsSlice';
import Spinner from '../../common/spinner';
import CenteredBox from '../../common/centered-box';
import { InView } from 'react-intersection-observer';

function BurgerIngredients() {
  const selectedIngredient = useSelector(selectSelectedIngredient);

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

  const dispatch = useDispatch();
  const ingredientsStatus = useSelector(selectIngredientsStatus);
  const ingredientsError = useSelector(selectIngredientsError);

  const buns = useSelector(selectIngredientsByType(TYPE_INGREDIENTS.bun.name));
  const sauces = useSelector(selectIngredientsByType(TYPE_INGREDIENTS.sauce.name));
  const mains = useSelector(selectIngredientsByType(TYPE_INGREDIENTS.main.name));

  const handleIngredientDetailsOpen = (ingredient) => {
    dispatch(selectIngredient(ingredient));
  };

  const handleIngredientDetailsClose = () => {
    dispatch(selectIngredient(null));
  };

  useEffect(() => {
    if (ingredientsStatus === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [ingredientsStatus, dispatch]);

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
          <Tab active={currentTab === TYPE_INGREDIENTS.bun.name} value="bun" onClick={() => {}}>
            {TYPE_INGREDIENTS.bun.title}
          </Tab>
          <Tab active={currentTab === TYPE_INGREDIENTS.sauce.name} value="sauce" onClick={() => {}}>
            {TYPE_INGREDIENTS.sauce.title}
          </Tab>
          <Tab active={currentTab === TYPE_INGREDIENTS.main.name} value="main" onClick={() => {}}>
            {TYPE_INGREDIENTS.main.title}
          </Tab>
        </div>

        <div className={styles.ingredients}>
          <InView as="div" onChange={(inView) => setIsBunsInView(inView)}>
            <BurgerIngredientsByType
              ingredients={buns}
              type={TYPE_INGREDIENTS.bun}
              onIngredientClick={handleIngredientDetailsOpen}
            />
          </InView>
          <InView as="div" onChange={(inView) => setIsSaucesInView(inView)}>
            <BurgerIngredientsByType
              ingredients={sauces}
              type={TYPE_INGREDIENTS.sauce}
              onIngredientClick={handleIngredientDetailsOpen}
            />
          </InView>
          <InView as="div" onChange={(inView) => setIsMainsInView(inView)}>
            <BurgerIngredientsByType
              ingredients={mains}
              type={TYPE_INGREDIENTS.main}
              onIngredientClick={handleIngredientDetailsOpen}
            />
          </InView>
        </div>
      </>
    ) : null;

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      {content}
      {selectedIngredient && (
        <IngredientDetailsModal ingredient={selectedIngredient} onClose={handleIngredientDetailsClose} />
      )}
    </section>
  );
}

export default BurgerIngredients;
