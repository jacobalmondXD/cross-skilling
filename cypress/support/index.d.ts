declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string): Chainable<void>;
    }
  }
}
export {};
