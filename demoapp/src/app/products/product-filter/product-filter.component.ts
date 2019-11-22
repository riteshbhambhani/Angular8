import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Categories } from 'src/app/model/categories';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent  {
  categories$;
  @Input('category') category: string;

  constructor(private categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories();
  }


}
