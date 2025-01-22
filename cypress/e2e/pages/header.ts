export class HeaderApp {

  getCurrentUserLogo(userName: string) {
    return cy.get("app-header").find(`[href="#/@${userName}"]`);
  }

  get newArticleButton() {
    return cy.get("app-header").contains('New Article');
  }

}