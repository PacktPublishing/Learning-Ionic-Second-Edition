import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, AlertController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { LoginPage } from './login';
import { Auth } from '../../providers/auth';
import { IP } from '../../providers/ip';

describe('Component: Login Component', () => {
  let fixture;
  let component;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyApp,
        LoginPage
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
      ],
      providers: [
        Auth,
        IP,
        NavController,
        AlertController
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
  });

  it('should initialize `userIp` to \'\'', () => {
    expect(component.userIp).toBe('');
  });

  it('should initialize `user`', () => {
    expect(component.user.email).toBe('a@a.com');
    expect(component.user.password).toBe('a');
  });

});