import React from 'react';
import PropTypes from 'prop-types';
import { burgerConstructorReducer } from './burger-constructor-reduser';

const BurgerConstructorContext = React.createContext(undefined);
const initialState = {
  bun: null,
  ingredients: [],
};

function BurgerConstructorProvider({ children }) {
  const [burger, burgerConstructorDispatcher] = React.useReducer(burgerConstructorReducer, initialState, undefined);

  return (
    <BurgerConstructorContext.Provider value={{ burger, burgerConstructorDispatcher }}>
      {children}
    </BurgerConstructorContext.Provider>
  );
}

function useBurgerConstructor() {
  const context = React.useContext(BurgerConstructorContext);

  if (context === undefined) {
    throw new Error('useBurgerConstructor must be used within a BurgerConstructorProvider');
  }

  return context;
}

BurgerConstructorProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { BurgerConstructorProvider, useBurgerConstructor };
