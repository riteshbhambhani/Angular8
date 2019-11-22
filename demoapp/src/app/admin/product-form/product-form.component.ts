import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Categories } from 'src/app/model/categories';
import { ProductService, Product } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$: Categories[] = [];
  recProduct: Product = {
    id: '',
    title: '',
    category: '',
    price: 0,
    imageUrl: ''
  };
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    categoryService.getCategories().
      subscribe(
        (category: Categories[]) => {
          this.categories$ = category;
          console.log('Categories,', this.categories$);
        });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).valueChanges().pipe(take(1)).
        subscribe(
          p => {
            this.recProduct = p
            console.log('product', p);
          }
        );
    }
  }

  ngOnInit() {
  }


  save(product: string) {  
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);

  }

  delete(){
    if (!confirm("Are you sure you want to delete this")) {     
      return;
    }
    console.log('Id for Delete', this.id);
    this.productService.deleteProduct(this.id);

    this.router.navigate(['/admin/products']);
    }
  }
