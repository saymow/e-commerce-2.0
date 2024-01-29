describe("Shop flux (complete)", () => {
  const WAIT_MS = 1500;

  it("Should be able to place an order as a guest user", () => {
    cy.visit("http://localhost:3000");
    cy.wait(WAIT_MS);

    cy.scrollTo("bottom", { duration: WAIT_MS });

    cy.contains("Shop").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("Airpods Wireless").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.get(".product-wish-button").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("ADD TO CART").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.get('[for="theme-checkbox"]').click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.get(".close-sider-bar-button").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("Back").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("Amazon Alexa").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("ADD TO CART").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.get('[for="theme-checkbox"]').click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("PROCEED TO CHECKOUT").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("CONTINUE CHECKOUT").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.get('[placeholder="XXXXX-XXX"]').type("13560-560");
    cy.scrollTo(0, 0);
    cy.wait(WAIT_MS);

    cy.contains("CHECK POSTAL CODE").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("Express").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("CONTINUE CHECKOUT").click({ scrollBehavior: false });

    cy.get('[name="email"]').type("user@user.com");
    cy.get('[name="password"]').type("Abc123456");
    cy.wait(WAIT_MS);

    cy.get('[type="submit"]').click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("CONTINUE CHECKOUT").click({ scrollBehavior: false });
    cy.scrollTo(0, 0);
    cy.wait(WAIT_MS);

    cy.contains("addresses list").click({ scrollBehavior: false, force: true });
    cy.wait(WAIT_MS);

    cy.contains("State:").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("CONTINUE").click();
    cy.scrollTo(0, 0);

    cy.wait(3000);

    cy.window()
      .its("handleSuccessPayment")
      .then((fn) => {
        fn(null, {
          orderID: "id",
          paymentSource: "paypal",
        });
      });

    cy.wait(10000);

    cy.contains("my orders").click();
    cy.wait(1000);

    cy.contains("Number").eq(-1).scrollIntoView({ duration: 1000 });
    cy.contains("Payment").eq(0).scrollIntoView({ duration: 1000 });

    cy.contains("Profile").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("Edit profile").click({ scrollBehavior: false });

    cy.get('[name="name"]').clear().type("John doe");

    cy.get("form").contains("Edit profile").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("Addresses").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);

    cy.contains("Sign out").click({ scrollBehavior: false });
    cy.wait(WAIT_MS);
  });
});
