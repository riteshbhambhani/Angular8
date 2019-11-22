import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Categories, CategoriesID } from './model/categories';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})



export class CategoryService {

  categoryCollectionRef: AngularFirestoreCollection<Categories>;
 
  constructor(private db: AngularFirestore) {

   }

  getCategories(){
    this.categoryCollectionRef = this.db.collection<Categories>('categories', ref=> ref.orderBy("name"));
    return this.categoryCollectionRef.valueChanges();
  
  }

}
