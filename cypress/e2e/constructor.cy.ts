/// <reference types="cypress" />

import {
  BASE_URL,
  BUN_TEST_NAME,
  INGREDIENTS_TEST_SELECTOR,
  MAIN_TEST_NAME1,
  MAIN_TEST_NAME2,
  MODAL_TEST_SELECTOR,
  PORTAL_TEST_SELECTOR,
  SAUCE_TEST_NAME,
} from '../../src/utils/constants';

describe('Full constructor and order', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BASE_URL}/auth/user`, {
      fixture: 'user',
    });
    cy.intercept('POST', `${BASE_URL}/orders`, {
      fixture: 'order',
    });
    cy.setLocalStorage('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');
    // @ts-ignore
    cy.seedAndVisit();
  });

  it('should open app, load ingredients and have ingredients for testing', () => {
    cy.get(INGREDIENTS_TEST_SELECTOR).as('ingredients');

    cy.get('@ingredients').should('contain', BUN_TEST_NAME);
    cy.get('@ingredients').should('contain', MAIN_TEST_NAME1);
    cy.get('@ingredients').should('contain', MAIN_TEST_NAME2);
    cy.get('@ingredients').should('contain', SAUCE_TEST_NAME);
  });

  it('should open modal with ingredient details', () => {
    cy.get(INGREDIENTS_TEST_SELECTOR).as('ingredients');

    cy.get('@ingredients').contains(BUN_TEST_NAME).click();
    cy.get(MODAL_TEST_SELECTOR).should('be.visible').should('contain', BUN_TEST_NAME);
  });

  it('should close modal on close button click', () => {
    cy.get(INGREDIENTS_TEST_SELECTOR).as('ingredients');
    cy.get(PORTAL_TEST_SELECTOR).as('portal');

    cy.get('@ingredients').contains(BUN_TEST_NAME).click();
    cy.get('@portal').should('contain', BUN_TEST_NAME);

    cy.get('[data-test=modal-btn-close]').click();
    cy.get('@portal').should('not.contain', BUN_TEST_NAME);
  });

  it('should close modal on overlay click', () => {
    cy.get(INGREDIENTS_TEST_SELECTOR).as('ingredients');
    cy.get(PORTAL_TEST_SELECTOR).as('portal');

    cy.get('@ingredients').contains(BUN_TEST_NAME).click();
    cy.get('@portal').should('contain', BUN_TEST_NAME);

    cy.get('[data-test=modal-overlay]').click({ force: true });

    cy.get('@portal').should('not.contain', BUN_TEST_NAME);
  });

  it('should close modal on esc', () => {
    cy.get(INGREDIENTS_TEST_SELECTOR).as('ingredients');
    cy.get(PORTAL_TEST_SELECTOR).as('portal');

    cy.get('@ingredients').contains(BUN_TEST_NAME).click();
    cy.get('@portal').should('contain', BUN_TEST_NAME);

    cy.get('body').type('{esc}');

    cy.get('@portal').should('not.contain', BUN_TEST_NAME);
  });

  it('construct burger and post order', function () {
    cy.get(INGREDIENTS_TEST_SELECTOR).as('ingredients');
    cy.get('[data-test=drop-target]').as('drop-target');
    cy.get(PORTAL_TEST_SELECTOR).as('portal');
    cy.get('@ingredients').contains(BUN_TEST_NAME).as('bun');

    cy.get('@bun').trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@ingredients').contains(MAIN_TEST_NAME1).trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@ingredients').contains(MAIN_TEST_NAME2).trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@ingredients').contains(SAUCE_TEST_NAME).trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@drop-target').should('contain', `${BUN_TEST_NAME} (верх)`);
    cy.get('@drop-target').should('contain', `${BUN_TEST_NAME} (низ)`);
    cy.get('@drop-target').should('contain', MAIN_TEST_NAME1);
    cy.get('@drop-target').should('contain', MAIN_TEST_NAME2);
    cy.get('@drop-target').should('contain', SAUCE_TEST_NAME);

    cy.get('@bun').should('contain', '2');

    cy.get('[data-test=order-button]').click();

    cy.get('@portal').should('contain', '123');
  });
});

export {};
