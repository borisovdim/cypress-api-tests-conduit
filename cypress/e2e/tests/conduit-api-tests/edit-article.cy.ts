import { createArticle, deleteArticle, editArticle, noAuthEditArticle} from "../../api/conduit-api";
import { generateFakeArticle } from "../../helper/fake-data-geterator";
import { getRandomNumber } from "../../helper/utils";

let slugs = [];
let newArticleSlug;

after(() => {
  slugs.forEach((slug) => {
    deleteArticle(slug);
  });
});

context("Positive cases", () => {

  it("should be able to edit an article", () => {
    const newArticle = generateFakeArticle();

    createArticle(newArticle)
      .then(({ body }) => {
        newArticleSlug = body.article.slug;
      })
      .then(() => {
        newArticle.article.title = newArticle.article.title + getRandomNumber();
      })
      .then(() => {
        editArticle(newArticleSlug, newArticle).then(({ status, body }) => {
          slugs.push(body.article.slug);

          expect(status).to.eq(200);
          expect(body.article.title).to.eq(newArticle.article.title);
        });
      });
  });
});

context("Negative cases", () => {

  it("should not be able to edit with wrong slug", () => {
    const newArticle = generateFakeArticle();

    createArticle(newArticle).then(({ body }) => {
      slugs.push(body.article.slug);

      editArticle("wrong-slug", newArticle).then(({ status }) => {
        expect(status).to.eq(404);
      });
    });
  });

  it("should not be able to edit an article as non autorized user", () => {
    const newArticle = generateFakeArticle();

    createArticle(newArticle)
      .then(({ body }) => {
        slugs.push(body.article.slug);
        newArticleSlug = body.article.slug;
      })
      .then(() => {
        newArticle.article.title = newArticle.article.title + getRandomNumber();
      })
      .then(() => {
        noAuthEditArticle(newArticleSlug, newArticle).then(({ status }) => {
          expect(status).to.eq(401);
        });
      });
  });
});
