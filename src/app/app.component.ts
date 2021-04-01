import { Component } from '@angular/core';
import { Product } from './models/product';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MasterShop';
  showCart = false;
  showEditForm = false;

  data: Product[] = [];
  cartList: Product[] = [];
  categories: string[] = [];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe(p => {
      this.data = p
      console.log(this.data);
    },
      err => {
        console.log(err.message)
      });
    this.shopService.getCategories().subscribe(p => {
      this.categories = p
    },
      err => {
        console.log(err.message)
      });
  }

  addToCart(product: Product) {
    if (this.cartList.find(p => p.title == product.title)) {
      this.cartList.map(p => {
        if (p.title == product.title) {
          p.quantity++;
        }
      });
    }
    else {
      product.quantity = 1;
      this.cartList.push(product);
    }
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }

  filterCategory(category: string) {
    this.shopService.getProductsByCategory(category).subscribe(p => this.data = p, err => console.log(err.message));
  }

}
