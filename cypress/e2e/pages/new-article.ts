/// <reference types="cypress" />

export class NewArticle {

  typeTitle(text: string) {
    cy.get('input[placeholder="Article Title"]').type(text);
  }

  typeDescription(text: string) {
    cy.get(`input[placeholder="What's this article about?"]`).type(text);
  }

  typeArticleBody(text: string) {
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(text);
  }

  typeTag(text: string) {
    cy.get('input[placeholder="Enter tags"]').type(text);
  }

  pudlishArticle() {
    cy.get('button.btn').click();
  }

  haveError(text: string) {
    cy.get('.error-messages').should('contain', text);
  }

}