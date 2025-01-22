export class Article {

  typeComment(text: string) {
    cy.get('textarea[placeholder="Write a comment..."]').type(text);
  }

  postComment() {
    cy.get('.card-footer button').click();
  }

  checkContent(text: string) {
    cy.get('.row.article-content').should('contain', text);
  }

  checkComment(text: string) {
    cy.get('.card-text').should('contain', text);
  }

}