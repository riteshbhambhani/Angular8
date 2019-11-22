import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input ('product') product: Product;
  
  constructor() { }

  ngOnInit() {
  }

}
