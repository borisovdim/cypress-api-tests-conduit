/// <reference types="cypress" />

export class HeaderApp {

  getCurrentUserLogo(userName: string) {
    return cy.get("app-layout-header").find(`[href="/profile/${userName}"]`);
  }

  get newArticleButton() {
    return cy.get("app-layout-header").contains('New Article');
  }

}