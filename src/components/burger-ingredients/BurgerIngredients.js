import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.css';

import { TYPE_INGREDIENTS } from '../../constants';
import BurgerIngredientsByType from '../burger-ingredients-by-type';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import { burger, ingredients } from '../../types';

function BurgerIngredients({ ingredients, burger }) {
  const [currentTab, setCurrentTab] = React.useState('bun');
  const [isIngredientDetailsVisible, setIsIngredientDetailsVisible] = React.useState(false);
  const [currentIngredientDetailsModal, setCurrentIngredientDetailsModal] = React.useState(null);

  const IngredientDetailsModal = (ingredient) => {
    return (
      <Modal header="Детали ингредиента" onClose={() => setIsIngredientDetailsVisible(false)}>
        <IngredientDetails ingredient={ingredient} onClose={() => setIsIngredientDetailsVisible(false)} />
      </Modal>
    );
  };

  const handleIngredientDetailsOpen = (ingredient) => {
    setCurrentIngredientDetailsModal(IngredientDetailsModal(ingredient));
    setIsIngredientDetailsVisible(true);
  };

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>

      <div className={`${styles.tabs} pb-10`}>
        <Tab active={currentTab === 'bun'} value="bun" onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab active={currentTab === 'sauce'} value="sauce" onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab active={currentTab === 'main'} value="main" onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredients}>
        <BurgerIngredientsByType
          ingredients={ingredients} burger={burger} type={TYPE_INGREDIENTS.bun}
          onIngredientClick={handleIngredientDetailsOpen}
        />
        < BurgerIngredientsByType
          ingredients={ingredients} burger={burger} type={TYPE_INGREDIENTS.sauce}
          onIngredientClick={handleIngredientDetailsOpen}
        />
        <BurgerIngredientsByType
          ingredients={ingredients} burger={burger} type={TYPE_INGREDIENTS.main}
          onIngredientClick={handleIngredientDetailsOpen}
        />
      </div>

      {isIngredientDetailsVisible && currentIngredientDetailsModal}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: ingredients.isRequired,
  burger: burger.isRequired,
}

export default BurgerIngredients;
