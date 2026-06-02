import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import PostService from "../services/PostService";

interface Post {
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

interface CommentItem {
  postId: number;
  name: string;
  email: string;
}

interface PostsData {
  testPostId: number;
  targetUserId: number;
  allPostsExpectedCount: number;
  allPostsExpectedTotalCount: number;
  expectedPost: ExpectedPost;
  newPost: Post;
  replacePost: Post;
  patchPost: PatchPost;
}

Before(() => {
  cy.fixture("posts.json").as("postsData");
});

Given("the test post is available", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { testPostId } = postsData;
    expect(testPostId).to.exist;
  });
});

When("I create a new post", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { newPost } = postsData;
    PostService.createPost(newPost.title, newPost.body, newPost.userId).then(
      (response) => {
        cy.wrap(response).as("lastResponse");
      },
    );
  });
});

Then("the response status should be {int}", (statusCode: number) => {
  cy.get<Cypress.Response<unknown>>("@lastResponse").then((lastResponse) => {
    expect(lastResponse.status).to.eq(statusCode);
  });
});

Then("the ID in the response should be {int}", (expectedID: number) => {
  cy.get<Cypress.Response<{ id: number }>>("@lastResponse").then(
    (lastResponse) => {
      expect(lastResponse.body.id).to.eq(expectedID);
    },
  );
});

When("I fetch all posts", () => {
  PostService.getAllPosts().then((response) => {
    cy.wrap(response).as("lastResponse");
  });
});

Then(
  "I should receive a list of posts matching the expected total count",
  () => {
    cy.get<Cypress.Response<ExpectedPost[]>>("@lastResponse").then(
      (lastResponse) => {
        cy.get<PostsData>("@postsData").then((postsData) => {
          const { allPostsExpectedTotalCount } = postsData;
          expect(lastResponse.body)
            .to.be.an("array")
            .with.lengthOf(allPostsExpectedTotalCount);
        });
      },
    );
  },
);

When("I fetch the target post", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { testPostId } = postsData;
    PostService.getPostById(testPostId).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then("the response should match the expected post data", () => {
  cy.get<Cypress.Response<ExpectedPost>>("@lastResponse").then(
    (lastResponse) => {
      cy.get<PostsData>("@postsData").then((postsData) => {
        const { expectedPost } = postsData;
        expect(lastResponse.body).to.deep.include({
          title: expectedPost.title,
          body: expectedPost.body,
          userId: expectedPost.userId,
        });
      });
    },
  );
});

When("I fetch all posts for the target user", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { targetUserId } = postsData;
    PostService.getPostsByUserId(targetUserId).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then("I should receive the expected number of posts", () => {
  cy.get<Cypress.Response<ExpectedPost[]>>("@lastResponse").then(
    (lastResponse) => {
      cy.get<PostsData>("@postsData").then((postsData) => {
        const { allPostsExpectedCount } = postsData;
        expect(lastResponse.body)
          .to.be.an("array")
          .with.lengthOf(allPostsExpectedCount);
      });
    },
  );
});

Then("every post should belong to the target user", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    cy.get<Cypress.Response<ExpectedPost[]>>("@lastResponse").then(
      (lastResponse) => {
        const { targetUserId } = postsData;
        lastResponse.body.forEach((post) => {
          expect(post.userId).to.eq(targetUserId);
        });
      },
    );
  });
});

When("I fetch the target post with embedded comments", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { testPostId } = postsData;
    PostService.getCommentsByPostId(testPostId).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then(
  "every item in the response should have a post ID matching the one specified",
  () => {
    cy.get<Cypress.Response<CommentItem[]>>("@lastResponse").then(
      (lastResponse) => {
        cy.get<PostsData>("@postsData").then((postsData) => {
          const { testPostId } = postsData;
          expect(lastResponse.body)
            .to.be.an("array")
            .with.length.greaterThan(0);
          lastResponse.body.forEach((comment) => {
            expect(comment.postId).to.eq(testPostId);
          });
        });
      },
    );
  },
);

Then("every item in the response should have a name and email", () => {
  cy.get<Cypress.Response<CommentItem[]>>("@lastResponse").then(
    (lastResponse) => {
      expect(lastResponse.body).to.be.an("array").with.length.greaterThan(0);
      lastResponse.body.forEach((comment) => {
        expect(comment).to.have.property("name");
        expect(comment).to.have.property("email");
      });
    },
  );
});

When("I replace the test post with replacement data", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { testPostId, replacePost } = postsData;
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

Then("the post title should match the replacement data", () => {
  cy.get<Cypress.Response<Post>>("@lastResponse").then((lastResponse) => {
    cy.get<PostsData>("@postsData").then((postsData) => {
      const { replacePost } = postsData;
      expect(lastResponse.body).to.have.property("title", replacePost.title);
    });
  });
});

Then("the post body should match the replacement data", () => {
  cy.get<Cypress.Response<Post>>("@lastResponse").then((lastResponse) => {
    cy.get<PostsData>("@postsData").then((postsData) => {
      const { replacePost } = postsData;
      expect(lastResponse.body).to.have.property("body", replacePost.body);
    });
  });
});

When("I update the test post with patched data", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { testPostId, patchPost } = postsData;
    PostService.patchPost(testPostId, patchPost.title).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});

Then("the post title should match the patched title", () => {
  cy.get<Cypress.Response<PatchPost>>("@lastResponse").then((lastResponse) => {
    cy.get<PostsData>("@postsData").then((postsData) => {
      const { patchPost } = postsData;
      expect(lastResponse.body).to.have.property("title", patchPost.title);
    });
  });
});

Then("the original body should still be present in the response", () => {
  cy.get<Cypress.Response<PatchPost>>("@lastResponse").then((lastResponse) => {
    cy.get<PostsData>("@postsData").then((postsData) => {
      const { patchPost } = postsData;
      expect(lastResponse.body).to.have.property("body", patchPost.body);
    });
  });
});

When("I delete the test post", () => {
  cy.get<PostsData>("@postsData").then((postsData) => {
    const { testPostId } = postsData;
    PostService.deletePost(testPostId).then((response) => {
      cy.wrap(response).as("lastResponse");
    });
  });
});
