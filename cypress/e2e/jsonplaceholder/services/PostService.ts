/**
 * PostService encapsulates all API interactions for the /posts resource.
 * This is intended to follow the Page Object Model pattern used in Focus 2
 */
class PostService {
  private baseUrl = "https://jsonplaceholder.typicode.com";

  createPost(title: string, body: string) {
    return cy.request({
      method: "POST",
      url: `${this.baseUrl}/posts`,
      body: {
        title,
        body,
        userId: 1, // Assuming a userId for the sake of the test
      },
    });
  }
}

export default new PostService();
