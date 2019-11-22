import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from 'src/app/product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  
 public products: Product[];
 filteredProducts: Product[];
 subscribtion: Subscription; 
  constructor(private productService: ProductService) { 
    this.subscribtion = this.productService.getAllProducts().subscribe(
      res=> {
      this.filteredProducts = this.products = res;         
      }
    )
    
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
  
  filter(query: string){
    this.filteredProducts = (query) ? this.products.filter(p=>  p.title.toLowerCase().includes(query.toLowerCase())) : this.products;   
  }

  ngOnInit() {
  }

}
