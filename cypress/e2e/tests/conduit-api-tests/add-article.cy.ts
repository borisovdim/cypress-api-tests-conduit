import { createArticle, deleteArticle } from "../../api/conduit-api";
import { name } from "../../../fixtures/test-user.json";
import { generateFakeArticle, generateFakeArticleNoTitle } from "../../helper/fake-data-geterator";

let slugs = [];

after(() => {
  slugs.forEach(slug => {
    deleteArticle(slug);
  });
});

context("Positive cases", () => {

  it("should be able to add a new article", () => {
    const newArticle = generateFakeArticle();

    createArticle(newArticle).then(({ status, body }) => {
      expect(status).to.eq(201);

      slugs.push(body.article.slug);

      expect(body.article.slug).to.not.be.empty;
      expect(body.article.createdAt).to.not.be.empty;
      expect(body.article.author).to.not.be.empty;
      expect(body.article.description).to.not.be.empty;
      expect(body.article.body).to.not.be.empty;
      expect(body.article.title).to.not.be.empty;
      expect(body.article.favorited).to.be.a("boolean");
      expect(body.article.favoritesCount).to.be.a("number");
      expect(body.article.author.username).to.eq(name);
    });
  });

});

context("Negative cases", () => {

  it("should not be able to add an article with empty title", () => {
    const noTitleArticle = generateFakeArticleNoTitle();

    createArticle(noTitleArticle).then(({ status, body }) => {
      expect(status).to.eq(422);
      expect(body.errors.title).contains("can't be blank");
    });
  });

  it("should not add article with the same title", () => {

    const newArticle = generateFakeArticle();

    createArticle(newArticle).then(({ status, body }) => {
      slugs.push(body.article.slug);
      expect(status).to.eq(201);
    });

    createArticle(newArticle).then(({ status, body }) => {
      expect(status).to.eq(422);
      expect(body.errors.title).contains("must be unique");
    });
  });

});