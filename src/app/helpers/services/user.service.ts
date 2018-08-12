import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  users: IUser[] = [];
  userSubject = new BehaviorSubject<boolean>(null);
  constructor() { }
  registerUser(user: IUser) {
    this.users.push(user);
    const userJson = JSON.stringify(this.users);
    sessionStorage.setItem('users', userJson);
    sessionStorage.setItem('userLogged', 'JWT');
    this.userSubject.next(true);
  }
  isUservalid(email: string, password: string): boolean {
    const users: IUser[] = JSON.parse(sessionStorage.getItem('users'));
    // tslint:disable-next-line:curly
    if (users) {
      const validUser = users.filter((user: IUser) => user.emailId === email && user.password === password);
      if (validUser.length > 0) {
        sessionStorage.setItem('userLogged', 'JWT');
        this.userSubject.next(true);
        return true;
      }
    }
    return false;
  }
  logOutUser() {
    sessionStorage.removeItem('userLogged');
    this.userSubject.next(false);
  }
  isUserLoggedIn() {
    if (sessionStorage.getItem('userLogged')) {
      return true;
    }
    return false;
  }

}
