import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PostService from "../services/PostService";

// TODO (Best Practice): Storing response in a module-level variable shares state across scenarios.
// Consider using a Cypress alias instead (e.g. cy.wrap(response).as('lastResponse') and cy.get('@lastResponse'))
// so that response state is naturally scoped to each individual scenario.
let lastResponse: Cypress.Response<any>;

interface NewPost {
  title: string;
  body: string;
  userId: number;
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
  PostService.createPost(newPost.title, newPost.body, newPost.userId).then(
    (response) => {
      lastResponse = response;
    },
  );
});

Then("the response status should be {int}", (statusCode: number) => {
  expect(lastResponse.status).to.eq(statusCode);
});

Then("the ID in the response should be {int}", (expectedID: number) => {
  expect(lastResponse.body).to.have.property("id", expectedID);
});

// TODO (Best Practice): lastUserId is assigned here but never read — the downstream Then step
// receives userId directly as a Cucumber parameter. This variable is dead code and can be removed.
let lastUserId: number;

When("I fetch all posts for userId {int}", (userId: number) => {
  lastUserId = userId;
  PostService.getPostsByUserId(userId).then((response) => {
    lastResponse = response;
  });
});

Then("I should receive {int} posts", (expectedCount: number) => {
  expect(lastResponse.status).to.eq(200);
  expect(lastResponse.body).to.be.an("array").with.lengthOf(expectedCount);
});

Then("every post should belong to userId {int}", (userId: number) => {
  lastResponse.body.forEach((post: { userId: number }) => {
    expect(post.userId).to.eq(userId);
  });
});
