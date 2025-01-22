import { createArticle, deleteArticle, getArticleByUserName} from "../../api/conduit-api";
import { HeaderApp } from "../../pages/header";
import { name } from "../../../fixtures/test-user.json";
import requestBody from "../../../fixtures/request-body-create-article.json";
import { UserPage } from "../../pages/user-page";

describe("Get my articles", () => {
  const header = new HeaderApp();
  const userPage = new UserPage();

  before(() => {
    requestBody.forEach((body) => {
      createArticle(body);
    });
  });

  beforeEach(() => {
    cy.visitTo("/");
    header.getCurrentUserLogo(name).click();
  });

  after(() => {
    getArticleByUserName(name)
      .then(({ body }) => {
        return body.articles.map((article) => article.slug);
      }).then((slugList) => {
        slugList.forEach((slug) => {
          deleteArticle(slug);
        });
      });
  });

  it("should get all my articles", () => {
    requestBody.forEach((body) => {
      userPage.getArticleByTitle(body.article.title).should("exist");
    });
  });

  it("should be able to like an article", () => {
    const firstArticle = requestBody[0].article.title;

    userPage
      .getLikesIkon(firstArticle)
      .invoke("text")
      .then((likes) => parseInt(likes))
      .as("likesBefore");
    userPage.getLikesIkon(firstArticle).click();
    userPage.likeIsAdded(firstArticle);
    userPage
      .getLikesIkon(firstArticle)
      .invoke("text")
      .then((likes) => parseInt(likes))
      .as("likesAfter");
    cy.then(() => {
      cy.get("@likesBefore").then((likesBefore) => {
        cy.get("@likesAfter").then((likesAfter) => {
          expect(likesAfter).to.not.eq(likesBefore);
        });
      });
    });
  });
});
