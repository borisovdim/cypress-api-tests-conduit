export class UserPage {
  getArticleByTitle(title: string) {
    return cy.get("article-list")
      .find("article-preview")
      .should("contain", `${title}`);
  }

  getLikesIkon(title: string) {
    return cy.contains(title)
      .parents("article-preview")
      .find("favorite-btn");
  }

  likeIsAdded(title: string) {
    cy.contains(title)
      .parents("article-preview")
      .find("favorite-btn button.btn-primary")
  }

}