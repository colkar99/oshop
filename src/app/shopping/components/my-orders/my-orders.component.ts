import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
orders$;
  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orders$ = this.authService.user$.switchMap(user =>{
      debugger
      return this.orderService.getOrders(user.uid);
    });
  }

  ngOnInit() {

    
  }

}
