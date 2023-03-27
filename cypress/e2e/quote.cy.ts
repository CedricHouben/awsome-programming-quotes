describe("quote tests", () => {
  it("should display a quote", () => {
    cy.visitAndCheck("/");
    cy.get('[data-qa="displayQuote-quote-title"]').should("not.be.undefined");
  });

  it("should display a specific quote", () => {
    cy.visitAndCheck("/5a9342458e7b510004cba4c7");
    cy.get('[data-qa="displayQuote-quote-title"]').contains(
      "Object-oriented design is the roman numerals of computing|"
    );
  });

  it("should allow user to share quote", () => {
    cy.visitAndCheck("/");
    cy.get('[data-qa="shareDrawer-share-btn"]').click();

    cy.get('[data-qa="shareQuote-copy-btn"]').click({ force: true });
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        cy.visitAndCheck(text);
        cy.get('[data-qa="displayQuote-quote-title"]').should(
          "not.be.undefined"
        );
      });
    });
  });

  it("should allow user to enable and disable reload mode", () => {
    cy.clock();
    cy.visitAndCheck("/");
    cy.get('[data-qa="playIcon-icon-svg"]').click();
    cy.url().should("include", "/reload");

    cy.get('[data-qa="displayQuote-quote-title"]').then(($value) => {
      const activeQuoteBeforeRating = $value.text();

      cy.tick(5000);
      cy.get('[data-qa="displayQuote-quote-title"]')
        .invoke("text")
        .should("to.not.contain", activeQuoteBeforeRating);
      cy.get('[data-qa="pauseIcon-icon-svg"]').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/");
      });
    });
  });
});
