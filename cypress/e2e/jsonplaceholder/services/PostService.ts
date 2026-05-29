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

  patchPost(postId: number, title: string) {
    return cy.request({
      method: "PATCH",
      url: `${this.baseUrl}/posts/${postId}`,
      body: {
        title,
      },
    });
  }

  deletePost(postId: number) {
    return cy.request({
      method: "DELETE",
      url: `${this.baseUrl}/posts/${postId}`,
    });
  }

  getAllPosts() {
    return cy.request({
      method: "GET",
      url: `${this.baseUrl}/posts`,
    });
  }

  getPostById(postId: number) {
    return cy.request({
      method: "GET",
      url: `${this.baseUrl}/posts/${postId}`,
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

  getCommentsByPostId(postId: number) {
    return cy.request({
      method: "GET",
      url: `${this.baseUrl}/posts/${postId}/comments`,
    });
  }
}

export default new PostService();
