import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  create() {
    return this.db.list('/shopping-carts').push({
      createdDate: new Date().getTime()
    })
  }
   async getCart(): Promise<Observable<ShoppingCart>>{
     let cartId = await this.getOrCreateCart()
    return this.db.object('/shopping-carts/'+ cartId)
    .map((x: any) => new ShoppingCart(x.items))
  }
  private getItem(product: Product, cartId: string){
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + product.$key)
  }
  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId
      let result = await this.create()
      localStorage.setItem('cartId',result.key);
      return result.key;
  }
  async addTocart(product: Product){
    this.addRemoveCart(product , 1);

  }
  async removeFromCart(product: Product){
    this.addRemoveCart(product , -1);
  }
  private async addRemoveCart(product: Product,change: number){
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(product,cartId);
    item$.take(1).subscribe((item: any) => {
      item$.update({product: product, quantity: (item.quantity || 0) + change})
    });
  }

}
