import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
@Input('product') product: Product
@Input('show_actions') show_actions: true;
@Input('shopping_cart') shopping_cart :ShoppingCart; 
  constructor(
    private cartService: ShoppingCartService
  ) { }

  addTocart(){
    this.cartService.addTocart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }


}
