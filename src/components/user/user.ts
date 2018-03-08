import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user'; 

/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  text: string;
  users: User[];

  constructor(
    private userProvider: UserProvider,
  ) {
    //console.log(user.getUsers());
    console.log('Hello UserComponent Component');
    this.text = 'Hello World';

    
    this.userProvider.getUsers().subscribe(users => {
      this.users = users;
    }, err => {
      console.warn('Could not get users', err);
    });
  }

}
