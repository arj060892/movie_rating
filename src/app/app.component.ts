import { Component, OnInit } from '@angular/core';
import { UserService } from './helpers/services/user.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isUserLogged = false;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
    this.userService.userSubject.subscribe(isUserIn => {
      this.isUserLogged = isUserIn;
    });
  }
  logout() {
    if (confirm('Do you want to logout?')) {
      this.userService.logOutUser();
      this.router.navigate(['login']);
    }
  }
}
