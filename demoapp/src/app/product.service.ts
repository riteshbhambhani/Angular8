import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id?: string,
  title: string,
  category: string,
  price: number,
  imageUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) {

  }

  getAllProducts() {
    //const products = this.db.collection<Product>("products").valueChanges(); 

    return this.db.collection<Product>("products").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  create(product: string) {
    return this.db.collection("products").add(product);
  }

  editProduct(productId: string) {
    if (productId) {
      this.db.collection("products");
    }
  }
  getProduct(productId: string) {
    if (productId) {
      console.log('id', productId);
      return this.db.collection("products").doc<Product>(productId);
    }
  }
     
  updateProduct(productId: string, product: any){    
  
    this.getProduct(productId).set(
      {
        "category": product.category,
        "title": product.title,
        "price": product.price,
        "imageUrl": product.imageUrl
    }, {merge: true});
  }

  deleteProduct(productId: string){    
    this.db.collection("products").doc(productId).delete();
  }


}

