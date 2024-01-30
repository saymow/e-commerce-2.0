describe('Flux', () => {
  const WAIT_MS = 1500;

  it('passes', () => {
    cy.visit('http://localhost:3006');

    cy.get('[name="email"]').type('test_admin@email.com');
    cy.get('[name="password"]').type('Abc123456');
    cy.wait(WAIT_MS);

    cy.get('button').click();
    cy.wait(WAIT_MS);

    cy.get('.sidebar-chevron').click();
    cy.wait(WAIT_MS);

    cy.contains('Create User').click();

    cy.get('[name="name"]').type('New user');
    cy.get('[name="email"]').type('new_user@user.com');
    cy.get('[name="password"]').type('123456Abc');
    cy.get('[name="confirmationPassword"]').type('123456Abc');
    cy.get('[name="contact_number"]').type('(99) 99999-9999');
    cy.get('[name="birth_date"]').type('2000-10-28');
    cy.wait(WAIT_MS);

    cy.get('[type="submit"]').click();
    cy.wait(WAIT_MS);

    cy.get('.sidebar-chevron').click();
    cy.wait(WAIT_MS);

    cy.contains('Products').click();
    cy.wait(WAIT_MS);

    cy.contains('Create Product').click();
    cy.wait(WAIT_MS);

    cy.get('[name="name"]').type('Samsung 55-Inch 4K QLED Smart TV');
    cy.get('[name="brand"]').type('Samsung');
    cy.get('[name="category"]').type('Electronics');
    cy.get('textarea').type(
      'Immerse yourself in stunning 4K visuals with this QLED Smart TV. Features smart functionality, vibrant colors, and a sleek design.'
    );
    cy.get('input[type="file"]').selectFile('cypress/fixtures/tv.jpeg');
    cy.get('[name="price"]').type('17999');
    cy.get('[name="count_in_stock"]').type('77');
    cy.wait(WAIT_MS);

    cy.get('[type="submit"]').click();
    cy.wait(WAIT_MS * 2);

    cy.contains('Samsung 55-Inch 4K QLED Smart TV')
      .parent()
      .find('button')
      .eq(0)
      .click();
    cy.wait(WAIT_MS * 3);

    cy.contains('Go back').click();
    cy.wait(WAIT_MS);

    cy.get('.sidebar-chevron').click();
    cy.wait(WAIT_MS);

    cy.contains('Orders').click();
    cy.wait(WAIT_MS);

    cy.contains('Show').click();
    cy.wait(WAIT_MS * 3);

    cy.contains('Go back').click();
    cy.wait(WAIT_MS);
  });
});
