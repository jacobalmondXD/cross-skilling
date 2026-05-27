import { When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import PostService from "../services/PostService";

interface NewPost {
  title: string;
  body: string;
  userId: number;
}

interface ReplacePost {
  postId: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsData {
  newPost: NewPost;
  replacePost: ReplacePost;
}

Before(() => {
  cy.fixture("posts.json").as("postsData");
});

When("I create a new post", () => {
  cy.get("@postsData").then((postsData: any) => {
    const { newPost } = postsData as PostsData;
    PostService.createPost(newPost.title, newPost.body, newPost.userId).then(
      (response) => {
        cy.wrap(response).as("lastResponse");
      },
    );
  });
});

Then("the response status should be {int}", (statusCode: number) => {
  cy.get("@lastResponse").then((lastResponse: any) => {
    expect(lastResponse.status).to.eq(statusCode);
  });
});

Then("the ID in the response should be {int}", (expectedID: number) => {
  cy.get("@lastResponse").then((lastResponse: any) => {
    expect(lastResponse.body.id).to.eq(expectedID);
  });
});

When("I fetch all posts for userId {int}", (userId: number) => {
  PostService.getPostsByUserId(userId).then((response) => {
    cy.wrap(response).as("lastResponse");
  });
});

Then("I should receive {int} posts", (expectedCount: number) => {
  cy.get("@lastResponse").then((lastResponse: any) => {
    expect(lastResponse.status).to.eq(200);
    expect(lastResponse.body).to.be.an("array").with.lengthOf(expectedCount);
  });
});

Then("every post should belong to userId {int}", (userId: number) => {
  cy.get("@lastResponse").then((lastResponse: any) => {
    lastResponse.body.forEach((post: { userId: number }) => {
      expect(post.userId).to.eq(userId);
    });
  });
});

When("I replace the target post with replacement data", function () {
  cy.get("@postsData").then((postsData: any) => {
    const { replacePost } = postsData as PostsData;
    PostService.replacePost(
      replacePost.postId,
      replacePost.title,
      replacePost.body,
      replacePost.userId,
    ).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then("the post title should match the replacement data", function () {
  cy.get("@lastResponse").then((lastResponse: any) => {
    cy.get("@postsData").then((postsData: any) => {
      const { replacePost } = postsData as PostsData;
      expect(lastResponse.body).to.have.property("title", replacePost.title);
    });
  });
});

Then("the post body should match the replacement data", function () {
  cy.get("@lastResponse").then((lastResponse: any) => {
    cy.get("@postsData").then((postsData: any) => {
      const { replacePost } = postsData as PostsData;
      expect(lastResponse.body).to.have.property("body", replacePost.body);
    });
  });
});
