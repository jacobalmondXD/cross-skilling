import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PostService from "../services/PostService";

let lastResponse: Cypress.Response<any>;

interface NewPost {
  title: string;
  body: string;
}

interface PostsData {
  newPost: NewPost;
}

let postsData: PostsData;

before(() => {
  cy.fixture("posts.json").then((data) => {
    postsData = data;
  });
});

When("I create a new post", () => {
  const { newPost } = postsData;
  PostService.createPost(newPost.title, newPost.body).then((response) => {
    lastResponse = response;
  });
});

Then("the response status should be {int}", (statusCode: number) => {
  expect(lastResponse.status).to.eq(statusCode);
});
