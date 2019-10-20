import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/switchMap'
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
    ) { }
   async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProduct();
  }
  private populateProduct(){
    this.productService.getProducts().switchMap((products: Product[]) =>{
      this.products = products;
      return this.route.queryParamMap
    })
    .subscribe(params =>{
      this.category = params.get('category');
      this.filterProduct()
    });

  }
  private filterProduct(){
    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products
  }

}
