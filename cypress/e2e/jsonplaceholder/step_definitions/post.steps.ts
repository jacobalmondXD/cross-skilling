import { When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import PostService from "../services/PostService";

interface NewPost {
  title: string;
  body: string;
  userId: number;
}

interface ReplacePost {
  title: string;
  body: string;
  userId: number;
}

interface PatchPost {
  title: string;
  body: string;
}

interface ExpectedPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsData {
  testPostId: number;
  targetUserId: number;
  allPostsExpectedTotalCount: number;
  expectedPost: ExpectedPost;
  newPost: NewPost;
  replacePost: ReplacePost;
  patchPost: PatchPost;
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

When("I fetch all posts", () => {
  PostService.getAllPosts().then((response) => {
    cy.wrap(response).as("lastResponse");
  });
});

Then(
  "I should receive a list of posts matching the expected total count",
  () => {
    cy.get("@lastResponse").then((lastResponse: any) => {
      cy.get("@postsData").then((postsData: any) => {
        const { allPostsExpectedTotalCount } = postsData as PostsData;
        expect(lastResponse.body)
          .to.be.an("array")
          .with.lengthOf(allPostsExpectedTotalCount);
      });
    });
  },
);

When("I fetch the target post", () => {
  cy.get("@postsData").then((postsData: any) => {
    const { testPostId } = postsData as PostsData;
    PostService.getPostById(testPostId).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then("the response should match the expected post data", () => {
  cy.get("@lastResponse").then((lastResponse: any) => {
    cy.get("@postsData").then((postsData: any) => {
      const { expectedPost } = postsData as PostsData;
      expect(lastResponse.body).to.deep.include({
        title: expectedPost.title,
        body: expectedPost.body,
        userId: expectedPost.userId,
      });
    });
  });
});

When("I fetch all posts for the target user", () => {
  cy.get("@postsData").then((postsData: any) => {
    const { targetUserId } = postsData as PostsData;
    PostService.getPostsByUserId(targetUserId).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then("I should receive the expected number of posts", () => {
  cy.get("@lastResponse").then((lastResponse: any) => {
    cy.get("@postsData").then((postsData: any) => {
      const { allPostsExpectedCount } = postsData as PostsData;
      expect(lastResponse.status).to.eq(200);
      expect(lastResponse.body)
        .to.be.an("array")
        .with.lengthOf(allPostsExpectedCount);
    });
  });
});

Then("every post should belong to the target user", () => {
  cy.get("@postsData").then((postsData: any) => {
    cy.get("@lastResponse").then((lastResponse: any) => {
      const { targetUserId } = postsData as PostsData;
      lastResponse.body.forEach((post: { userId: number }) => {
        expect(post.userId).to.eq(targetUserId);
      });
    });
  });
});

When("I replace the test post with replacement data", function () {
  cy.get("@postsData").then((postsData: any) => {
    const { testPostId, replacePost } = postsData as PostsData;
    PostService.replacePost(
      testPostId,
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

When("I update the test post with patched data", function () {
  cy.get("@postsData").then((postsData: any) => {
    const { testPostId, patchPost } = postsData as PostsData;
    PostService.patchPost(testPostId, patchPost.title).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then("the post title should match the patched title", function () {
  cy.get("@lastResponse").then((lastResponse: any) => {
    cy.get("@postsData").then((postsData: any) => {
      const { patchPost } = postsData as PostsData;
      expect(lastResponse.body).to.have.property("title", patchPost.title);
    });
  });
});

Then("the original body should still be present in the response", function () {
  cy.get("@lastResponse").then((lastResponse: any) => {
    cy.get("@postsData").then((postsData: any) => {
      const { patchPost } = postsData as PostsData;
      expect(lastResponse.body).to.have.property("body", patchPost.body);
    });
  });
});

When("I delete the test post", function () {
  cy.get("@postsData").then((postsData: any) => {
    const { testPostId } = postsData as PostsData;
    PostService.deletePost(testPostId).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});
