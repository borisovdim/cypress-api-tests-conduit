import { deleteArticle, getArticleByUserName } from "../../api/conduit-api";
import { HeaderApp } from "../../pages/header";
import { name } from "../../../fixtures/test-user.json";
import { NewArticle } from "../../pages/new-article";
import { generateFakeArticle } from "../../helper/fake-data-geterator";
import { UserPage } from "../../pages/user-page";
import { Article } from "../../pages/article";

describe("Article creation", () => {
  const header = new HeaderApp();
  const userPage = new UserPage();
  const newArticlePage = new NewArticle();
  const articlePage = new Article();

  beforeEach(() => {
    cy.visitTo("/");
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

  context("Positive cases", () => {

    it("should be able create a new aricle via UI", () => {
      const { article } = generateFakeArticle();
  
      header.newArticleButton.click();
      newArticlePage.typeTitle(article.title);
      newArticlePage.typeDescription(article.description);
      newArticlePage.typeArticleBody(article.body);
      newArticlePage.typeTag(article.tagList[0]);
      newArticlePage.typeTag(`, ${article.tagList[1]}`);
      newArticlePage.pudlishArticle();
  
      articlePage.typeComment(article.tagList[2]);
      articlePage.postComment();
      articlePage.commentIsAdded();
  
      header.getCurrentUserLogo(name).click();
      userPage.getArticleByTitle(article.title).should("exist").click();
  
      articlePage.checkContent(article.body);
      articlePage.checkComment(article.tagList[2]);
      articlePage.checkTag([article.tagList[0], article.tagList[1]]);
    });
  });

  context("Negative cases", () => {

    it("should not be able create a new aricle without Title", () => {
      const { article } = generateFakeArticle();
  
      header.newArticleButton.click();
      
      newArticlePage.typeDescription(article.description);
      newArticlePage.typeArticleBody(article.body);
      newArticlePage.typeTag(article.tagList[0]);
      newArticlePage.typeTag(`, ${article.tagList[1]}`);
      newArticlePage.pudlishArticle();

      newArticlePage.haveError("title can't be blank");
    });
  });

});
