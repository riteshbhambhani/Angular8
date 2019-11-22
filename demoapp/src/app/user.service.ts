import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from './model/appUsers';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { 

  }

  save(user: firebase.User){
    if(user){
      this.db.firestore.collection("users").
      doc(user.uid).set(
        {name: user.displayName,
        email:user.email,
        isAdmin: true});
    }
  }

  getUser(uid: string) : Observable<AppUser> {    
    return  this.db.doc<AppUser>("users/"+ uid).valueChanges();      
  }
}
