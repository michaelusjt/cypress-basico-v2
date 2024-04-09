/// <reference types="Cypress" />

/// 
describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT' )
  })

  /// O .only usamos para rodar somente o teste criado
  it('preenche os campos obrigatórios e envia o formulário', function(){

   const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'

    cy.get('#firstName').type('Michael')  
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#phone').type('999999999')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    cy.contains('button', 'Enviar').click()
 // cy.get('button[type="submit"]').click()   ---> Podemos criar o testes com Get no selector
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

    cy.get('#firstName').type('Michael')  
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('teste@gmail,com')
    cy.get('#phone').type('999999999')
    cy.get('#open-text-area').type('testando')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('campo de telefone continua vazio quando preenchido com valor diferente de número', function(){
    cy.get('#phone')
      .type('abcadfefefe')
      .should('have.value', '')

  })

  it(`exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário`, function(){

    cy.get('#firstName').type('Michael')  
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('testando')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it(`preenche e limpa os campos nome, sobrenome, email e telefone`, function(){
    cy.get('#firstName')
      .type('Michael')
      .should('have.value', 'Michael')
      .clear()
      .should('have.value', '')
      cy.get('#lastName')
      .type('Alves')
      .should('have.value', 'Alves')
      .clear()
      .should('have.value', '')
      cy.get('#email')
      .type('alves@yahoo.com')
      .should('have.value', 'alves@yahoo.com')
      .clear()
      .should('have.value', '')
      cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })

  it(`exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios`, function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })


  it(`envia o formuário com sucesso usando um comando customizado`, function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it(`seleciona um produto (YouTube) por seu texto`, function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it(`seleciona um produto (Mentoria) por seu valor (value)`, function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })

  it(`seleciona um produto (Blog) por seu índice`, function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it(`marca o tipo de atendimento "Feedback"`, function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')

  })

  it(`marca cada tipo de atendimento`, function(){
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it(`marca ambos checkboxes, depois desmarca o último`, function() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it(`exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário`, function(){

    cy.get('#firstName').type('Michael')  
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('testando')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it(`seleciona um arquivo da pasta fixtures`, function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equals('example.json')
      })

  })
  ///Neste teste estamos silulando o arraste do arquivo para o file pelo usuário (Commands)
  it(`seleciona um arquivo simulando um drag-and-drop`, function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {anction:'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equals('example.json')
    })
  })
  /// Neste teste estamos usando o arias para consultar o arquivo
  it(`seleciona um arquivo utilizando uma fixture para a qual foi dada um alias`, function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equals('example.json')
      })
  })
  /// Neste teste estamos validando se existe o elemento _blank sem que haja o click
  it(`verifica que a política de privacidade abre em outra aba sem a necessidade de um clique`, function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
 
  /// Neste teste estamos validando abrir a privacidade sem o target
  it(`acessa a página da política de privacidade removendo o target e então clicando no link`, function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Tsting').should('be.visible')  
  })

})
