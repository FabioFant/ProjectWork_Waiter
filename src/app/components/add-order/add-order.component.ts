import { Component, OnDestroy, OnInit } from '@angular/core';
import Category from '../../models/Category';
import Product from '../../models/Product';
import { WaiterService } from '../../services/waiter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { interval, Subscription, switchMap } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-add-order',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})

export class AddOrderComponent implements OnInit, OnDestroy {
  private polling!: Subscription;

  categories: Category[] = [];
  productsForCategory: Product[][] = [[]];
  tableId: number;
  loading = true;

  constructor(private waiterService: WaiterService, private route: ActivatedRoute, private router: Router) {
    this.tableId = this.route.snapshot.params["id"]

    this.waiterService.GetAllCategories().subscribe({
      next: r => {
        this.categories = r;
        if (this.categories.length === 0) {
          this.loading = false;
          return;
        }
        let loadedCount = 0;
        this.categories.forEach(category => {
          this.waiterService.GetProductsByCategoryId(category.id).subscribe({
            next: products => {
              this.productsForCategory[category.id] = products;
              this.productsForCategory[category.id].forEach(product => {
                product.qty = this.readProductOnStorage(product);
              });
              loadedCount++;
              if (loadedCount === this.categories.length) {
                this.loading = false;
              }
            },
            error: e => {
              alert("Error fetching products for category");
              loadedCount++;
              if (loadedCount === this.categories.length) {
                this.loading = false;
              }
            }
          });
        });
      },
      error: e => {
        alert("Error fetching categories");
        this.loading = false;
      }
    });
  }
  readProductOnStorage(product: Product): number {
    const storedQty = localStorage.getItem(product.name);
    if (storedQty) {
      return parseInt(storedQty);
    }
    return 0; 
  }
  /*
  
  getCart() {
    let cart = 0;
    for (const categoryId in this.productsForCategory) {
      for (const product of this.productsForCategory[categoryId]) {
        cart += this.readProductOnStorage(product);
      }
    }
    return cart;
  }*/

  changeQuantity(product: Product, change: number) {
    if (product.qty + change >= 0) {
      product.qty += change;
      this.updateOrder(product)
    }
  }

  updateOrder(product: Product) {
    if (product.qty == 0) {
      localStorage.removeItem(product.name);
    }
    else {
      localStorage.setItem(product.name, product.qty.toString());
    }
  }

  sendOrder() {
    const products = this.productsForCategory.flat().filter(product => product.qty > 0);
    if (products.length > 0) {
      this.loading = true;
      this.waiterService.AddTableOrder(this.tableId, products).subscribe({
        next: () => {
          // Clear local storage for products after order is sent
          products.forEach(product => localStorage.removeItem(product.name));
          this.loading = false;
          this.router.navigate(['tables/' + this.tableId + '/order']);
        }
      });
    }
  }

  ngOnInit() {
    this.polling = interval(enviroment.pollingInterval)
      .pipe(
        switchMap(() => this.waiterService.GetTableById(this.tableId))
      )
      .subscribe({
        next: r => {
          if(!r.occupied)
            this.router.navigate([''], {
              state: { tableClosed: true }
            });
        },
        error: err => console.error('Polling error:', err)
      });
  }

  ngOnDestroy() {
    if( this.polling ) {
      this.polling.unsubscribe();
    }
  }
}