import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Auth } from '../../providers/auth';
import { IP } from '../../providers/ip';
import { Todos } from '../../providers/todos';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	private i = 1; // ID for notifications
	userIp = '';
	userTodos = [];

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		private localNotifications: LocalNotifications,
		private auth: Auth,
		private ip: IP,
		private todos: Todos, ) {

		// check if the user is authenticated
		auth.isAuthenticated().then((isAuth) => {
			if (!isAuth) {
				navCtrl.setRoot(LoginPage);
			}
		});

		// fetch todos on load
		this.todos.get().then((_todos) => {
			this.userTodos = _todos || [];
		});

		// Get the user's IP
		ip.get().subscribe((data) => {
			this.userIp = data.json().ip;
		});
	}

	add() {
		let addTodoPopup = this.alertCtrl.create({
			title: 'Add Todo',
			inputs: [
				{
					name: 'text',
					placeholder: 'Enter a Todo To Do'
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: (data) => {
						// console.log('Cancel clicked');
					}
				},
				{
					text: 'Save',
					handler: (data) => {
						if (data.text) {
							let todo = {
								text: data.text,
								isCompleted: false
							};
							this.userTodos.push(todo);
							// store the todos
							this.todos.set(this.userTodos);
							this.notify('Todo Created');

						} else {
							return false;
						}
					}
				}

			]
		});
		addTodoPopup.present();
	}

	update(todo, slidingItem) {
		todo.isCompleted = !todo.isCompleted;
		// store the todos
		this.todos.set(this.userTodos);
		slidingItem.close();
		this.notify('Todo Updated');
	}

	delete(todo, index) {
		let alert = this.alertCtrl.create({
			title: 'Delete Todo',
			message: 'Are you sure you want to delete "' + todo.text + '"? ',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => {
						// console.log('Cancel clicked');
					}
				},
				{
					text: 'Yes',
					handler: () => {
						this.userTodos.splice(index, 1);
						this.todos.set(this.userTodos);
						this.notify('Todo Deleted');
					}
				}
			]
		});
		alert.present();

	}

	logout() {
		this.auth.logout();
		this.navCtrl.setRoot(LoginPage);
	}

	private notify(text) {
		return this.localNotifications.schedule({
			id: this.i++,
			title: 'Todo App',
			text: text,
		});
	}
}
