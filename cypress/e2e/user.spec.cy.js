import userData from '../fixtures/userData.json'  

describe('Orange HRM Tests', () => {
  
  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: '.oxd-button',
    topBarHeader: '.oxd-topbar-header-breadcrumb',
    dashboardGrid: '.orangehrm-dashboard-grid',
    wrongCredentialAlert: '.oxd-alert',
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: '[name="firstName"]',
    lastNameField: '[name="lastName"]',
    genericField: '.oxd-input--active',
    genderSelector: '.oxd-radio-input',
    dateField: "[placeholder='yyyy-dd-mm']",
    saveButton: '.orangehrm-left-space'
  }

    it.only('User Info Update - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal','/web/index.php/dashboard/index')
    cy.get(selectorsList.topBarHeader).contains('Dashboard')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type("Eric")
    cy.get(selectorsList.lastNameField).clear().type("Cantona")
    cy.get(selectorsList.genericField).eq(3).clear().type("30042026") //Employee ID
    cy.get(selectorsList.genericField).eq(4).clear().type("20260430") //Other Employee ID
    cy.get(selectorsList.genericField).eq(5).clear().type("123454321") //Driver's License Number
    cy.get(selectorsList.dateField).eq(0).clear().type("2026-01-01") //License Expiry Date
    cy.get('.oxd-label').eq(3).click() //Click para fechar o calendário apenas 
    cy.get(selectorsList.dateField).eq(1).clear().type("1999-12-02")  //Birth Date
    cy.get('.oxd-label').eq(3).click() //Click para fechar o calendário apenas
    cy.get(selectorsList.genderSelector).eq(0).click() //Male Selection (0) Female Selection (1)
    cy.get(selectorsList.saveButton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated') //Validação de Sucesso  
  })

  it('Login - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal','/web/index.php/dashboard/index')
    cy.get(selectorsList.topBarHeader).contains('Dashboard')
    cy.get(selectorsList.dashboardGrid)
    })
    
    it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)  
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
    })


})