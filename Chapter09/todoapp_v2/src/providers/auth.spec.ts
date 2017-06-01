import { async, TestBed, inject } from '@angular/core/testing';
import { Auth } from './auth';
import { IonicStorageModule } from '@ionic/storage';
import { StorageMocks } from '../mocks/storageMocks';

let validUser = {
  email: 'a@a.com',
  password: 'a'
}

let inValidUser = {
  email: 'a@a.com',
  password: 'b'
}

describe('Service: AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot()
      ],
      providers: [
        Auth,
        { provide: IonicStorageModule, useClass: StorageMocks },
      ]
    });
    
  }));

  it('should construct', async(inject(
    [Auth, IonicStorageModule], (authService, ionicStorageModule) => {
      expect(authService).toBeDefined();
    })));

  it('should login user with valid credentials', async(inject(
    [Auth, IonicStorageModule], (authService, ionicStorageModule) => {
      expect(authService.login(validUser)).toBeTruthy();
    })));

  it('should not login user with invalid credentials', async(inject(
    [Auth, IonicStorageModule], (authService, ionicStorageModule) => {
      expect(authService.login(inValidUser)).toBeFalsy();
    })));

  it('should return the auth status as true', async(inject(
    [Auth, IonicStorageModule], (authService, ionicStorageModule) => {
      // log the user in!
      authService.login(validUser);
      let result = authService.isAuthenticated();

      result.then((status) => {
        expect(status).toBeTruthy();
      })
    })));


  it('should set auth to falsy on logout', async(inject(
    [Auth, IonicStorageModule], (authService, ionicStorageModule) => {
      // log the user in!
      let authStatus = authService.login(validUser);
      // check if login is successful
      expect(authStatus).toBeTruthy();

      // trigger logout
      let result = authService.logout();
      result.then((status) => {
        expect(status).toBeFalsy();
      });
    })));

});