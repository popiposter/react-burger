import reducer, {
  addIngredient,
  IBurgerConstructorState,
  initialState,
  moveIngredient,
  removeIngredient,
} from './burgerConstructorSlice';
import {
  bunConstructorIngredientMock,
  mainConstructorIngredientMock,
  sauceConstructorIngredientMock,
} from '../utils/constants';

describe('burgerConstructorSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle addIngredient bun', () => {
    const action = { type: addIngredient.type, payload: bunConstructorIngredientMock };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      burger: {
        ...initialState.burger,
        bun: action.payload,
      },
    });
  });

  it('should handle addIngredient not bun', () => {
    const action = { type: addIngredient.type, payload: sauceConstructorIngredientMock };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [action.payload],
      },
    });
  });

  it('should handle removeIngredient bun', function () {
    const action = { type: removeIngredient.type, payload: bunConstructorIngredientMock };
    const state: IBurgerConstructorState = {
      ...initialState,
      burger: {
        ...initialState.burger,
        bun: bunConstructorIngredientMock,
      },
    };

    const result = reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      burger: {
        ...initialState.burger,
        bun: null,
      },
    });
  });

  it('should handle removeIngredient not bun', function () {
    const action = { type: removeIngredient.type, payload: sauceConstructorIngredientMock };
    const state: IBurgerConstructorState = {
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [sauceConstructorIngredientMock],
      },
    };
    const result = reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [],
      },
    });
  });

  it('should handle moveIngredient', function () {
    const action = { type: moveIngredient.type, payload: { fromIndex: 0, toIndex: 1 } };
    const state: IBurgerConstructorState = {
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [sauceConstructorIngredientMock, mainConstructorIngredientMock],
      },
    };
    const result = reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      burger: {
        ...initialState.burger,
        ingredients: [mainConstructorIngredientMock, sauceConstructorIngredientMock],
      },
    });
  });
});
