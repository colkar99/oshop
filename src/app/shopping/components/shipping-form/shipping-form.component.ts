import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  order: {};
  userId: string;
  shipping = {};
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { 
      this.authService.user$.subscribe(user=>{
        this.userId = user.uid;
      })
    }

  ngOnInit() {
  }
  async submit(){
    this.order = new Order(this.userId,this.shipping,this.cart);
    let result = await this.orderService.orderSave(this.order);
    this.router.navigate(['/order-success', result.key]);
  }

}
