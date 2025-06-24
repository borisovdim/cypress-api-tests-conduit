/// <reference types="cypress" />

import './commands';
import testUser from '../fixtures/test-user.json';

before(() => {
  const { email, password } = testUser;
  cy.login(email, password);
});
