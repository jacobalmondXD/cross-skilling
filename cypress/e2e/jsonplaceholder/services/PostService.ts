/**
 * PostService encapsulates all API interactions for the /posts resource.
 * This is intended to follow the Page Object Model pattern used in Focus 2
 */
class PostService {
  private baseUrl = "https://jsonplaceholder.typicode.com";

  createPost(title: string, body: string, userId: number) {
    return cy.request({
      method: "POST",
      url: `${this.baseUrl}/posts`,
      body: {
        title,
        body,
        userId,
      },
    });
  }

  replacePost(postId: number, title: string, body: string, userId: number) {
    return cy.request({
      method: "PUT",
      url: `${this.baseUrl}/posts/${postId}`,
      body: {
        title,
        body,
        userId,
      },
    });
  }

  getPostsByUserId(userId: number) {
    return cy.request({
      method: "GET",
      url: `${this.baseUrl}/posts`,
      qs: {
        userId,
      },
    });
  }
}

export default new PostService();
