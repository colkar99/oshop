import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$;

  constructor(private auth: AuthService,private cartService: ShoppingCartService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

}
