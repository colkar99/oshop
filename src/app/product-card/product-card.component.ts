import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input('product') product: Product
@Input('show_actions') show_actions: true;
@Input('shopping_cart') shopping_cart; 
  constructor(
    private cartService: ShoppingCartService
  ) { }

  addTocart(){
    this.cartService.addTocart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
  ngOnInit() {
  }
  getQuantity(){
    if(!this.shopping_cart) return 0
    let item =  this.shopping_cart.items[this.product.$key];
    return (item) ? item.quantity : 0;
  }

}
