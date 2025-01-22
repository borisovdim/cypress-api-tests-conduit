import { getNoAuthUsersArticle, getUsersArticle } from "../../api/conduit-api";

context("Positive cases", () => {
  it("should be able to get articles", () => {
    getUsersArticle(5, 0).then(({ status, body }) => {
      const { articles } = body;

      expect(status).to.eq(200);

      expect(articles).to.have.length(5);

      expect(articles[0]).to.have.property("slug");
      expect(articles[0]).to.have.property("description");
      expect(articles[0]).to.have.property("title");
      expect(articles[0]).to.have.property("author");

      expect(articles).to.be.an("array");
      expect(articles[0].favorited).to.be.a("boolean");
      expect(articles[0].favoritesCount).to.be.a("number");
    });
  });
});

context("Negative cases", () => {
  it("should not be able to get articles as not authorized user", () => {
    getNoAuthUsersArticle(5, 0).then(({ status }) => {
      expect(status).to.eq(401);
    });
  });
});
