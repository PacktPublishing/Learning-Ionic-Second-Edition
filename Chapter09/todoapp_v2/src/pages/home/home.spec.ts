import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { HomePage } from './home';
import { LoginPage } from '../login/login';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocalNotificationsMocks } from '../../mocks/localNotificationMocks';
import { Auth } from '../../providers/auth';
import { IP } from '../../providers/ip';
import { Todos } from '../../providers/todos';

describe('Component: Home Component', () => {
  let fixture;
  let component;
  let localNotif;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyApp,
        HomePage,
        LoginPage
      ],
      imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
      ],
      providers: [
        Auth,
        Todos,
        IP,
        { provide: LocalNotifications, useClass: LocalNotificationsMocks },
        NavController,
        AlertController
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    localNotif = new LocalNotificationsMocks();
  });

  it('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
  });

  it('should initialize `userIp` to \'\'', () => {
    expect(component.userIp).toBe('');
  });

  it('should initialize `userTodos`', () => {
    expect(component.userTodos.length).toBe(0);
  });

  // this is how we mock and test 
  // ionic-native plugins
  it('should return null when a new notification is scheduled', () => {
    expect(component.notify()).toBe(localNotif.schedule());
  });

});