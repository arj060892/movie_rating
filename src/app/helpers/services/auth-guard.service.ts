import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
@Injectable()
export class AuthGuardService implements CanActivate {
   constructor(private userService: UserService, private route: Router) { }
   canActivate(): boolean {
      if (!this.userService.isUserLoggedIn()) {
         this.route.navigate(['login']);
         return false;
      }
      return true;
   }
}