import { faker } from '@faker-js/faker'

export const generateFakeArticle = () => {
  return {
    article: {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(),
      body: faker.lorem.paragraph(),
      tagList: [faker.word.noun(), faker.word.noun(), faker.word.noun()],
    },
  }
}

export const generateFakeArticleNoTitle = () => {
  return {
    article: {
      title: null,
      description: faker.lorem.sentences(),
      body: faker.lorem.paragraph(),
    },
  }
}
