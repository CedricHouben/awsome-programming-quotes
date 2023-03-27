import { faker } from "@faker-js/faker";

describe("auth tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.get('[data-qa="authenticationSection-logout-btn"]').click();
    cy.get('[data-qa="authenticationSection-login-btn"]').click();
  });

  it("should allow users to like and dislike a quote", () => {
    cy.login();
    cy.visitAndCheck("/");

    cy.get('[data-qa="rateQuote-submit-btn"]').click();
    cy.get('[data-qa="likeIconActive-icon-svg"]');
    cy.get('[data-qa="rateQuote-submit-btn"]').click();
    cy.get('[data-qa="likeIcon-icon-svg"]');
  });

  it("should allow users to like and dislike a quote in the reload mode without updating the quote", () => {
    cy.login();
    cy.visitAndCheck("/");
    cy.get('[data-qa="playIcon-icon-svg"]').click();
    cy.url().should("include", "/reload");
    cy.get('[data-qa="displayQuote-quote-title"]').then(($value) => {
      const activeQuoteBeforeRating = $value.text();
      cy.get('[data-qa="rateQuote-submit-btn"]').click();
      cy.get('[data-qa="likeIconActive-icon-svg"]');
      cy.get('[data-qa="rateQuote-submit-btn"]').click();
      cy.get('[data-qa="likeIcon-icon-svg"]');
      cy.get('[data-qa="displayQuote-quote-title"]').should(
        "contain",
        activeQuoteBeforeRating
      );
    });
  });
});
