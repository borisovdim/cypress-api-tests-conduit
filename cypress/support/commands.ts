/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import testUser from "../fixtures/test-user.json";

Cypress.Commands.add("login", (email, password) => {
  return cy.request("POST", Cypress.env('apiBaseURL') + "/users/login", {
    user: { email, password },
  }).then(({ status, body }) => {
    expect(status).to.eq(200);
    expect(body).to.have.key("user");
    const { user } = body;

    return cy.writeFile("tmp/token.txt", user.token);
  });
});

Cypress.Commands.add("getToken", () => {
  cy.readFile("tmp/token.txt")
    .should("not.be.empty")
    .then((token) => {
      return token;
    });
});

Cypress.Commands.add("setJwtToken", (window, token) => {
  window.localStorage.setItem("jwtToken", token);
});

// auth visit to UI
Cypress.Commands.add("visitTo", (path: string) => {
  cy.getToken().then((token) => {
    cy.setJwtToken(window, token);
  });
  cy.visit(path);
  cy.get(".navbar").should("be.visible").should("contain.text", testUser.name);
});

// all in one API request
Cypress.Commands.add("apiRequest", (method: string, url: string, body: object | string = {}) => {
    let data;
    let dataPromise;

    cy.getToken().then((token) => {
      data = {
        method,
        url,
        headers: {
          Authorization: `Token ${token}`,
        },
        body: body == "" ? null : body,
        failOnStatusCode: false,
      };
    });

    if (body) {
      if (typeof body === "string") {
        dataPromise = cy.fixture(body).then((fixtureData) => {
          data.body = fixtureData;
          return data;
        });
      } else {
        dataPromise = cy.wrap(data).then(() => {
          data.body = body;
          return data;
        });
      }
    } else {
      dataPromise = cy.wrap(data);
    }

    return dataPromise.then((preparedData) => {
      return cy.request(preparedData);
    });
  }
);

// GET request
Cypress.Commands.add("readRequest", (url: string, auth: boolean = true) => {
  let data;
  let dataPromise;

  if (!auth) {
    data = {
      method: "GET",
      url,
      failOnStatusCode: false,
    };
  } else {
    cy.getToken().then((token) => {
      data = {
        method: "GET",
        url,
        headers: {
          Authorization: `Token ${token}`,
        },
        failOnStatusCode: false,
      };
    });
  }

  cy.then(() => {
    dataPromise = cy.wrap(data);
  }).then(() => {
    return dataPromise.then((preparedData) => {
      return cy.request(preparedData);
    });
  });
});

// DELETE request
Cypress.Commands.add("deleteRequest", (url: string, auth: boolean = true) => {
  let data;
  let dataPromise;

  if (!auth) {
    data = {
      method: "DELETE",
      url,
      failOnStatusCode: false,
    };
  } else {
    cy.getToken().then((token) => {
      data = {
        method: "DELETE",
        url,
        headers: {
          Authorization: `Token ${token}`,
        },
        failOnStatusCode: false,
      };
    });
  }

  cy.then(() => {
    dataPromise = cy.wrap(data);
  }).then(() => {
    return dataPromise.then((preparedData) => {
      return cy.request(preparedData);
    });
  });
});

// POST request
Cypress.Commands.add("createRequest", (url: string, body: object | string, auth: boolean = true) => {
    let data;
    let dataPromise;

    if (!auth) {
      data = {
        method: "POST",
        url,
        body,
        failOnStatusCode: false,
      };
    } else {
      cy.getToken().then((token) => {
        data = {
          method: "POST",
          url,
          headers: {
            Authorization: `Token ${token}`,
          },
          body,
          failOnStatusCode: false,
        };
      });
    }

    if (typeof body === "string") {
      dataPromise = cy.fixture(body).then((fixtureData) => {
        data.body = fixtureData;
        return data;
      });
    } else {
      dataPromise = cy.wrap(data).then(() => {
        data.body = body;
        return data;
      });
    }

    return dataPromise.then((preparedData) => {
      return cy.request(preparedData);
    });
  });

// PUT request
Cypress.Commands.add("updateRequest", (url: string, body: object | string, auth: boolean = true) => {
  let data;
  let dataPromise;

  if (!auth) {
    data = {
      method: "PUT",
      url,
      body,
      failOnStatusCode: false,
    };
  } else {
    cy.getToken().then((token) => {
      data = {
        method: "PUT",
        url,
        headers: {
          Authorization: `Token ${token}`,
        },
        body,
        failOnStatusCode: false,
      };
    });
  }

  if (typeof body === "string") {
    dataPromise = cy.fixture(body).then((fixtureData) => {
      data.body = fixtureData;
      return data;
    });
  } else {
    dataPromise = cy.wrap(data).then(() => {
      data.body = body;
      return data;
    });
  }

  return dataPromise.then((preparedData) => {
    return cy.request(preparedData);
  });
});
