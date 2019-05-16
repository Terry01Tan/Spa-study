import * as helper from '../../helpers/login';
import { login } from '../../helpers/auth-forms';

describe('My Account - Update Password', () => {
  const PAGE_TITLE_UPDATE_PASSWORD = 'Update Password';
  const PAGE_TITLE_HOME = 'Homepage';
  const PAGE_URL_UPDATE_PASSWORD = '/my-account/update-password';
  const PAGE_URL_LOGIN = '/login';

  describe('when an anonymous user tries to access the page', () => {
    it('should be redirected to the login page', () => {
      cy.visit(PAGE_URL_UPDATE_PASSWORD);
      cy.url().should('contain', PAGE_URL_LOGIN);
    });
  });

  describe('when a user is authenticated', () => {
    let user: any;
    const newPassword = 'newPassword123!';

    before(() => {
      cy.visit('/');
      user = helper.registerUser();
      helper.signOutUser();
    });

    beforeEach(() => {
      cy.visit('/');
      cy.contains(/Sign In/i).click();
      login(user.email, user.password);
      cy.selectUserMenuOption('Password');
      cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
      cy.title().should('eq', PAGE_TITLE_UPDATE_PASSWORD);
    });

    it('should cancel bring back to the home page.', () => {
      cy.get('cx-update-password button[type="button"]').click();
      cy.title().should('eq', PAGE_TITLE_HOME);
      cy.get('cx-global-message .alert').should('not.exist');
      helper.signOutUser();
    });

    it('should display server error if old password is wrong.', () => {
      cy.get('cx-global-message .alert-danger').should('not.exist');
      cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
      cy.get('[formcontrolname="newPassword"]').type(newPassword);
      cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
      cy.get('cx-update-password button[type="submit"]').click();
      cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
      cy.get('cx-global-message .alert-danger').should('exist');
      cy.visit('/');
      helper.signOutUser();
    });

    it('should update the password with success.', () => {
      cy.get('cx-global-message .alert-success').should('not.exist');
      cy.get('[formcontrolname="oldPassword"]').type(user.password);
      cy.get('[formcontrolname="newPassword"]').type(newPassword);
      cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
      cy.get('cx-update-password button[type="submit"]').click();
      cy.title().should('eq', PAGE_TITLE_HOME);
      cy.get('cx-global-message .alert-success').should('exist');

      helper.signOutUser();
      cy.contains(/Sign In/i).click();
      login(user.email, newPassword);
      cy.get(helper.userGreetSelector).should('exist');
    });
  });
});
