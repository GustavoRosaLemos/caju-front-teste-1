import mocks from '../fixtures/mocks.json';
import config from '../fixtures/config.json';

describe('Dashboard', () => {
  it('Should access dashboard page', () => {
    cy.visit('http://localhost:3001/')
    cy.url().should("include", "/dashboard");
  })
  describe("Registrations", () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/');
    })
    it('Should create registration with success', () => {
      cy.get('[data-testid="Searchbar_button_newAdmission"]').should('be.visible').click();
      cy.url().should("include", "/new-user");

      cy.get('[data-testid="NewUser_TextField_name"]').should("be.visible").type(mocks.registration.employeeName).should("have.value", mocks.registration.employeeName);
      cy.get('[data-testid="NewUser_TextField_email"]').should("be.visible").type(mocks.registration.email).should("have.value", mocks.registration.email);
      cy.get('[data-testid="NewUser_TextField_cpf"]').should("be.visible").type(mocks.registration.cpf).should("have.value", mocks.registration.formattedCpf);
      cy.get('[data-testid="NewUser_TextField_admissionDate"]').should("be.visible").type(mocks.registration.admissionDate).should("have.value", mocks.registration.admissionDate);

      cy.intercept('POST', config.registrationsUrl).as('createRegistration');
      cy.get('[data-testid="NewUser_Button_submit"]').click();
      cy.wait('@createRegistration').its('response.statusCode').should('equal', 201);
    })
    it('Should display registration card', () => {
      cy.contains('[data-testid="RegistrationCard_h3_employeeName"]', mocks.registration.employeeName);
      cy.contains('[data-testid="RegistrationCard_p_email"]', mocks.registration.email);
      cy.contains('[data-testid="RegistrationCard_span_admissionDate"]', mocks.registration.admissionDate);
      cy.contains(config.card.pendingTitle).parent().find('[data-testid="RegistrationCard_Card"]').within(() => {
        cy.get('[data-testid="RegistrationCard_h3_employeeName"]').should('have.text', mocks.registration.employeeName);
      });
    })
    it('Should approve pending registration card', () => {
      cy.contains('[data-testid="RegistrationCard_Card"]', mocks.registration.employeeName).find('[data-testid="RegistrationCard_ButtonSmall_approve"]').should('be.visible').click();
      cy.get('[data-testid="ConfirmationModal_Card"]').should("be.visible");
      cy.get('[data-testid="ConfirmationModal_Button_confirm"]').should('be.visible').click();
      cy.contains(config.card.approvedTitle).parent().find('[data-testid="RegistrationCard_Card"]').within(() => {
        cy.get('[data-testid="RegistrationCard_h3_employeeName"]').should('have.text', mocks.registration.employeeName);
      });
    })
    it('Should review approved registration card', () => {
      cy.contains('[data-testid="RegistrationCard_Card"]', mocks.registration.employeeName).find('[data-testid="RegistrationCard_ButtonSmall_review"]').should('be.visible').click();
      cy.get('[data-testid="ConfirmationModal_Card"]').should("be.visible");
      cy.get('[data-testid="ConfirmationModal_Button_confirm"]').should('be.visible').click();
      cy.contains(config.card.pendingTitle).parent().find('[data-testid="RegistrationCard_Card"]').within(() => {
        cy.get('[data-testid="RegistrationCard_h3_employeeName"]').should('have.text', mocks.registration.employeeName);
      });
    })
    it('Should reprove pending registration card', () => {
      cy.contains('[data-testid="RegistrationCard_Card"]', mocks.registration.employeeName).find('[data-testid="RegistrationCard_ButtonSmall_reprove"]').should('be.visible').click();
      cy.get('[data-testid="ConfirmationModal_Card"]').should("be.visible");
      cy.get('[data-testid="ConfirmationModal_Button_confirm"]').should('be.visible').click();
      cy.contains(config.card.reprovedTitle).parent().find('[data-testid="RegistrationCard_Card"]').within(() => {
        cy.get('[data-testid="RegistrationCard_h3_employeeName"]').should('have.text', mocks.registration.employeeName);
      });
    })
    it('Should review reproved registration card', () => {
      cy.contains('[data-testid="RegistrationCard_Card"]', mocks.registration.employeeName).find('[data-testid="RegistrationCard_ButtonSmall_review"]').should('be.visible').click();
      cy.get('[data-testid="ConfirmationModal_Card"]').should("be.visible");
      cy.get('[data-testid="ConfirmationModal_Button_confirm"]').should('be.visible').click();
      cy.contains(config.card.pendingTitle).parent().find('[data-testid="RegistrationCard_Card"]').within(() => {
        cy.get('[data-testid="RegistrationCard_h3_employeeName"]').should('have.text', mocks.registration.employeeName);
      });
    })
    it('Should filter registation card', () => {
      cy.get('[data-testid="Searchbar_texfield_cpf"]').type(mocks.registration.cpf).should('have.value', mocks.registration.formattedCpf).type('{enter}');
      cy.get('[data-testid="RegistrationCard_Card"]').each(($el) => {
        cy.wrap($el).find('[data-testid="RegistrationCard_h3_employeeName"]').should('contain', mocks.registration.employeeName);
      });
    })
    it('Should delete registration card', () => {
      cy.contains('[data-testid="RegistrationCard_Card"]', mocks.registration.employeeName).find('[data-testid="RegistrationCard_HiOutlineTrash_delete"]').should('be.visible').click();
      cy.get('[data-testid="ConfirmationModal_Card"]').should("be.visible");
      cy.get('[data-testid="ConfirmationModal_Button_confirm"]').should('be.visible').click();
    })
  })
})