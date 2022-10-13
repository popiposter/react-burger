const SET_BUN = 'setBun';
const SET_INGREDIENTS = 'setIngredients';
const ADD_INGREDIENT = 'addIngredient';
const SET_BURGER = 'setBurger';
const REMOVE_INGREDIENT = 'removeIngredient';

export const burgerConstructorReducer = (state, action) => {
  switch (action.type) {
    case SET_BUN: {
      const { bun } = action.payload;

      return {
        ...state,
        bun,
      };
    }

    case SET_INGREDIENTS: {
      const { ingredients } = action.payload;

      return {
        ...state,
        ingredients: ingredients,
      };
    }

    case ADD_INGREDIENT: {
      const { ingredient } = action.payload;

      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
      };
    }

    case SET_BURGER: {
      return {
        ...action.payload,
      };
    }

    case REMOVE_INGREDIENT: {
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

export const setBurgerAction = (burger) => {
  return {
    type: SET_BURGER,
    payload: {
      bun: burger.bun,
      ingredients: burger.ingredients,
    },
  };
}
