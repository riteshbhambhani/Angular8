import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { map, switchMap, subscribeOn } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{ 

  constructor(private userService: UserService, private authService: AuthService) {

   }

  canActivate(): Observable<boolean> {
        return this.authService.appUser$.pipe( map( recUser => 
           recUser.isAdmin ));
  }
}