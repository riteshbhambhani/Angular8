import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService, Product } from '../product.service';
import { Categories } from '../model/categories';
import { switchMap } from 'rxjs/operators';
import { RouteConfigLoadEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
 
  products: Product[];
  filteredProducts: Product[];
  category: string;  
  constructor(private productService: ProductService, route:ActivatedRoute) {
    productService.getAllProducts().pipe
    (switchMap (
      products=>{ 
      this.products = products ;
      return route.queryParamMap;
      }
    )).subscribe(
      params => {
        this.category = params.get('category');

        this.filteredProducts= (this.category) ? this.products.filter( p=> p.category === this.category): this.products;
      }
    );
    
  }

}
