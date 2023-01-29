/// <reference types="cypress" />

describe('Full constructor and order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user',
    });
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order',
    });
    cy.setLocalStorage('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');
    // @ts-ignore
    cy.seedAndVisit();
  });

  it('should open app, load ingredients and have ingredients for testing', () => {
    cy.get('[data-test=ingredients]').as('ingredients');

    cy.get('@ingredients').should('contain', 'Булка тест');
    cy.get('@ingredients').should('contain', 'Начинка тест 1');
    cy.get('@ingredients').should('contain', 'Начинка тест 2');
    cy.get('@ingredients').should('contain', 'Соус тест');
  });

  it('should open modal with ingredient details', () => {
    cy.get('[data-test=ingredients]').as('ingredients');

    cy.get('@ingredients').contains('Булка тест').click();
    cy.get('[data-test=modal]').should('be.visible').should('contain', 'Булка тест');
  });

  it('should close modal on close button click', () => {
    cy.get('[data-test=ingredients]').as('ingredients');
    cy.get('[id=react-modals]').as('portal');

    cy.get('@ingredients').contains('Булка тест').click();
    cy.get('@portal').should('contain', 'Булка тест');

    cy.get('[data-test=modal-btn-close]').click();
    cy.get('@portal').should('not.contain', 'Булка тест');
  });

  it('should close modal on overlay click', () => {
    cy.get('[data-test=ingredients]').as('ingredients');
    cy.get('[id=react-modals]').as('portal');

    cy.get('@ingredients').contains('Булка тест').click();
    cy.get('@portal').should('contain', 'Булка тест');

    cy.get('[data-test=modal-overlay]').click({ force: true });

    cy.get('@portal').should('not.contain', 'Булка тест');
  });

  it('should close modal on esc', () => {
    cy.get('[data-test=ingredients]').as('ingredients');
    cy.get('[id=react-modals]').as('portal');

    cy.get('@ingredients').contains('Булка тест').click();
    cy.get('@portal').should('contain', 'Булка тест');

    cy.get('body').type('{esc}');

    cy.get('@portal').should('not.contain', 'Булка тест');
  });

  it('construct burger and post order', function () {
    cy.get('[data-test=ingredients]').as('ingredients');
    cy.get('[data-test=drop-target]').as('drop-target');
    cy.get('[id=react-modals]').as('portal');
    cy.get('@ingredients').contains('Булка тест').as('bun');

    cy.get('@bun').trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@ingredients').contains('Начинка тест 1').trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@ingredients').contains('Начинка тест 2').trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@ingredients').contains('Соус тест').trigger('dragstart');
    cy.get('@drop-target').trigger('drop');

    cy.get('@drop-target').should('contain', 'Булка тест (верх)');
    cy.get('@drop-target').should('contain', 'Булка тест (низ)');
    cy.get('@drop-target').should('contain', 'Начинка тест 1');
    cy.get('@drop-target').should('contain', 'Начинка тест 2');
    cy.get('@drop-target').should('contain', 'Соус тест');

    cy.get('@bun').should('contain', '2');

    cy.get('[data-test=order-button]').click();

    cy.get('@portal').should('contain', '123');
  });
});

export {};
