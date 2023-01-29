import reducer, { fetchIngredients, initialState } from './burgerIngredientsSlice';
import {
  bunConstructorIngredientMock,
  mainConstructorIngredientMock,
  sauceConstructorIngredientMock,
} from '../utils/constants';

describe('burgerIngredientsSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [bunConstructorIngredientMock, sauceConstructorIngredientMock, mainConstructorIngredientMock],
    };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      ingredients: action.payload,
    });
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });
});
