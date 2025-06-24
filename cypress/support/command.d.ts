declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): any;
    visitTo(path?: string): void;
    setJwtToken(window, token: string): void;
    apiRequest(method: string, url: string, body?: object | string);
    getToken(): Chainable;
    apiNoAuthRequest(method: string, url: string, body?: object | string);
    readRequest(url: string, auth?: boolean);
    deleteRequest(url: string, auth?: boolean);
    createRequest(url: string, body: object | string, auth?: boolean);
    updateRequest(url: string, body: object | string, auth?: boolean);
  }
}