import React from 'react';
import PropTypes from 'prop-types';

const BurgerConstructorContext = React.createContext(undefined);
const initialState = {
  bun: null,
  ingredients: [],
};

function burgerConstructorReducer(state, action) {
  switch (action.type) {
    case 'setBun': {
      const { bun } = action.payload;

      return {
        ...state,
        bun,
      };
    }

    case 'setIngredients': {
      const { ingredients } = action.payload;

      return {
        ...state,
        ingredients: ingredients,
      };
    }

    case 'addIngredient': {
      const { ingredient } = action.payload;

      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
      };
    }

    case 'setBurger': {
      return {
        ...action.payload,
      };
    }

    case 'removeIngredient': {
      const { ingredient } = action.payload;

      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item._id !== ingredient._id),
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

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
