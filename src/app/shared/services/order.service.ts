import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase,
    private cartService: ShoppingCartService) { }

  async orderSave(order){
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
  getOrders(userId: string){
    return this.db.list('/orders',{
      query:{
        equalTo: userId,
        orderByChild: 'userId'
      }
    })
  }

}
