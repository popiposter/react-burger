import React, { useEffect } from 'react';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';

import styles from './app.module.css';
import { useBurgerConstructor } from '../../context/burger-constructor-context';
import stellarBurgersApi from '../../utils/StellarBurgersApi';
import { setBurgerAction } from '../../context/burger-constructor-reduser';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const { burgerConstructorDispatcher } = useBurgerConstructor();

  useEffect(() => {
    stellarBurgersApi.getIngredients()
      .then((res) => {
          setIngredients(res.data);
          burgerConstructorDispatcher(setBurgerAction({
            bun: res.data[0],
            ingredients: [
              res.data[8],
              res.data[3],
              res.data[11],
              res.data[10],
              res.data[10],
              res.data[12],
              res.data[13],
              res.data[7],
            ]
          }))
        }
      )
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <main className={styles.main}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerConstructor />
    </main>
  );
}

export default App;
