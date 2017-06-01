import { async, TestBed, inject } from '@angular/core/testing';
import { Todos } from './todos';
import { IonicStorageModule } from '@ionic/storage';
import { StorageMocks } from '../mocks/storageMocks';

let todos = [{
  text: 'Buy Eggs',
  isCompleted: false
}];

describe('Service: TodoService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicStorageModule.forRoot()
      ],
      providers: [
        Todos,
        { provide: IonicStorageModule, useClass: StorageMocks },
      ]
    });

  }));

  it('should construct', async(inject(
    [Todos, IonicStorageModule], (todoService, ionicStorageModule) => {
      expect(todoService).toBeDefined();
    })));

  it('should fetch 0 todos initally', async(inject(
    [Todos, IonicStorageModule], (todoService, ionicStorageModule) => {
      let result = todoService.get();
      result.then((todos) => {
        expect(todos).toBeFalsy();
      });
    })));

  it('should save a todo', async(inject(
    [Todos, IonicStorageModule], (todoService, ionicStorageModule) => {
      let result = todoService.set(todos);
      result.then((_todos) => {
        expect(_todos).toEqual(todos);
        expect(_todos.length).toEqual(1);
      });
    }))); 

   it('should update a todo', async(inject(
    [Todos, IonicStorageModule], (todoService, ionicStorageModule) => {
      let todo = todos[0];
      todo.isCompleted = true;
      todos[0] = todo;
      let result = todoService.set(todos);
      result.then((_todos) => {
        expect(_todos[0].isCompleted).toBeTruthy();
      });
    })));  

   it('should delete a todo', async(inject(
    [Todos, IonicStorageModule], (todoService, ionicStorageModule) => {
      todos.splice(0, 1);
      let result = todoService.set(todos);
      result.then((_todos) => {
        expect(_todos.length).toEqual(0);
      });
    })));  

});