import { Component, Input } from '@angular/core';
import { ShoppingCartService} from '../shopping-cart.service';
import { Product} from '../models/product';
@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product: Product;
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
}
