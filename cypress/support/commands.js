Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Michael')  
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type('testando')
    cy.contains('button', 'Enviar').click()
})