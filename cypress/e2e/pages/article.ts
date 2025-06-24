/// <reference types="cypress" />

export class Article {

  typeComment(text: string) {
    cy.get('textarea[placeholder="Write a comment..."]').type(text);
  }

  postComment() {
    cy.get('button[type="submit"]').click();
  }

  commentIsAdded() {
    cy.get('app-article-comment').should('exist');
  }

  checkContent(text: string) {
    cy.get('.row.article-content').should('contain', text);
  }

  checkComment(text: string) {
    cy.get('.card-text').should('contain', text);
  }

   checkTag(text: string[]) {
    text.forEach(t => {
      cy.get('.tag-list').should('contain', t);
    })
  }

}