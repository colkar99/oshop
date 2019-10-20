import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';

import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  constructor(private cartService: ShoppingCartService) { }



  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
