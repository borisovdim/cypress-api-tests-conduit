import { generateFakeArticle } from '../helper/fake-data-geterator';

export const createArticle = (body) => {
  return cy.createRequest(Cypress.env('apiBaseURL') + '/articles', body);
};

export const deleteArticle = (slug) => {
  return cy.deleteRequest(Cypress.env('apiBaseURL') + `/articles/${slug}`)
    .then(({ status }) => {
      expect(status).to.eq(204);
    });
};

export const editArticle = (slug, body) => {
  return cy.updateRequest(Cypress.env('apiBaseURL') + `/articles/${slug}`, body);
}; 

export const noAuthEditArticle = (slug, body) => {
  return cy.updateRequest(Cypress.env('apiBaseURL') + `/articles/${slug}`, body, false);
}; 

export const getUsersArticle = (limit, offset) => {
  return cy.readRequest(Cypress.env('apiBaseURL') + `/articles?limit=${limit}&offset=${offset}`);
};

export const getNoAuthUsersArticle = (limit, offset) => {
  return cy.readRequest(Cypress.env('apiBaseURL') + `/articles/feed?limit=${limit}&offset=${offset}`, false);
};

export const getArticleByUserName = (username) => {
  return cy.readRequest(Cypress.env('apiBaseURL') + `/articles/?author=${username}`);
};