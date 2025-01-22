import { name } from "../../../fixtures/test-user.json";

describe("Check all Links", () => {
  const pages = [
    {
      name: "New Article",
      path: "#/editor/",
    },
    {
      name: "Settings",
      path: "#/settings",
    },
    {
      name: "User",
      path: `#/@${name}`,
    },
  ];
  pages.forEach(({ name, path }) => {
    it(`get all links on ${name} page should be working`, () => {
      cy.visitTo(path);
      cy.get("a.nav-link[href]").then((links) => {
        cy.wrap(links).each((link) => {
          cy.wrap(link)
            .invoke("attr", "href")
            .then((href) => {
              cy.readRequest(href).its("status").should("eq", 200);
            });
        });
      });
    });
  });
});
