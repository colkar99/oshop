import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap'
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
    ) {
  
    this.productService.getProducts().switchMap((products: Product[]) =>{
      this.products = products;
      return this.route.queryParamMap
    })
    .subscribe(params =>{
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products
      console.log(this.category);
    });


   }
   async ngOnInit() {
    let shopping_cart = await this.cartService.getCart();
    this.subscription = shopping_cart.subscribe(cart => {
      this.cart = cart
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
