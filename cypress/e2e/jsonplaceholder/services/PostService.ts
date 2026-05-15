/**
 * PostService encapsulates all API interactions for the /posts resource.
 * This is intended to follow the Page Object Model pattern used in Focus 2
 */
class PostService {
  private baseUrl = "https://jsonplaceholder.typicode.com";

  // TODO (Best Practice): userId is hardcoded here rather than being accepted as a parameter
  // or sourced from the fixture. Since userId is meaningful test data, it should be passed in
  // (e.g. createPost(title: string, body: string, userId: number)) or read from the fixture
  // via the step definition to keep test data centralised and the method reusable.
  createPost(title: string, body: string) {
    return cy.request({
      method: "POST",
      url: `${this.baseUrl}/posts`,
      body: {
        title,
        body,
        userId: 1,
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
