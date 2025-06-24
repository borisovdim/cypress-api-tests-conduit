/// <reference types="cypress" />

export class UserPage {
  getArticleByTitle(title: string) {
    return cy.get("app-article-list")
      .find(".article-preview")
      .should("contain", `${title}`);
  }

  getLikesIkon(title: string) {
    return cy.contains(title)
      .parents(".article-preview")
      .find("app-favorite-button");
  }

  likeIsAdded(title: string) {
    cy.contains(title)
      .parents(".article-preview")
      .find("app-favorite-button button.btn-primary")
  }

}