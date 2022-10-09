import React, { useEffect } from 'react';
import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';

import { API_INGREDIENTS } from '../../constants';

import styles from './app.module.css';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [burger, setBurger] = React.useState({ bun: null, ingredients: [] });

  useEffect(() => {
    fetch(API_INGREDIENTS)
      .then((res) => res.json())
      .then((res) => {
        setIngredients(res.data);
        setBurger({
          bun: res.data[0], ingredients: [
            res.data[8],
            res.data[3],
            res.data[11],
            res.data[10],
            res.data[10],
            res.data[12],
            res.data[13],
            res.data[14],
          ]
        })
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} burger={burger} />
        <BurgerConstructor burger={burger} />
      </main>
    </div>
  );
}

export default App;
