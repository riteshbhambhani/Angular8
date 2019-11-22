import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, EMPTY } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './model/appUsers';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute) {

    this.user$ = afAuth.authState;

  }

  login() {
    console.log('Inside Login');
    let returnURL = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnURL);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    console.log('Logout');
    return this.afAuth.auth.signOut();
  }

  get authenticated() {
    console.log('Auth Object: ', this.afAuth.auth);
    return this.afAuth.auth.currentUser != null;
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user: firebase.User) => 
      {
       if(user)  return this.userService.getUser(user.uid);
      
       return EMPTY; 
      }
      ));
  }
}
