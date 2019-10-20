import { Component, Input } from '@angular/core';
import { ShoppingCartService} from 'shared/services/shopping-cart.service';
import { Product} from 'shared/models/product';
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
