import { browser, element, by, ElementFinder } from 'protractor';

// https://www.joshmorony.com/e2e-end-to-end-testing-in-ionic-2-an-introduction/ 
describe('Check Navigation : ', () => {
 
  beforeEach(() => {
    browser.get('');
  });
 
  it('should have `Todo App (v2)` as the title text on the Login Page', () => {
      expect(element(by.css('.toolbar-title'))
        .getAttribute('innerText')) 
        .toContain('Todo App (v2)'); 
 
  });
 
  it('should be able to login with prefilled credentials', () => {
    element(by.css('.scroll-content > button')).click().then(() => { 
      // Wait for the page transition
      browser.driver.sleep(3000);
   
      // check if we have really redirected
      expect(element(by.css('.scroll-content > button'))
        .getAttribute('innerText')) 
        .toContain('ADD TODO');

      expect(element(by.css('h2.text-center'))
        .getAttribute('innerText')) 
        .toContain('No Todos');

      expect(element(by.css('ion-footer > h3'))
        .getAttribute('innerText')) 
        .toContain('Your IP : 183.82.232.178');

    });
 
  });

  it('should be able to logout', () => {
     element(by.css('ion-buttons > button')).click().then(() => { 

      // Wait for the page transition
      browser.driver.sleep(3000);
   
      // check if we have really redirected
      expect(element(by.css('.toolbar-title'))
        .getAttribute('innerText')) 
        .toContain('Todo App (v2)');
    });
  });
 
});