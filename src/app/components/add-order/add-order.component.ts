import { Component } from '@angular/core';
import Category from '../../models/Category';
import Product from '../../models/Product';
import { WaiterService } from '../../services/waiter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-order',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})

export class AddOrderComponent {
  categories:Category[] = [];
  productsForCategory: Product[][] = [[]];
  tableId: number;

  constructor(private service:WaiterService, private route:ActivatedRoute, private router:Router) {
    this.tableId = this.route.snapshot.params["id"]

    this.service.GetAllCategories().subscribe({
      next: r => {
        this.categories = r;
        this.categories.forEach(category => {
          this.service.GetProductsByCategoryId(category.id).subscribe({
            next: products => {
              this.productsForCategory[category.id] = products;
              this.productsForCategory[category.id].forEach(product => {
                product.qty = this.readProductOnStorage(product);
              });
            },
            error: e => alert("Error fetching products for category")
          });
        });
      },
      error: e => alert("Error fetching categories")
    });
  }

  readProductOnStorage(product:Product):number{
    const storedQty = localStorage.getItem(product.name);
    if (storedQty) {
      return parseInt(storedQty);
    }
    return 0; // Return null if no quantity is stored
  }

  changeQuantity(product: Product, change: number) {
    if (product.qty + change >= 0) {
      product.qty += change;
      this.updateOrder(product)
    }
  }

  updateOrder(product:Product){
    if(product.qty == 0) 
    {
      localStorage.removeItem(product.name);
    } 
    else {
      localStorage.setItem(product.name,  product.qty.toString());
    }
  }

  inviaOrdine(){
    const products = this.productsForCategory.flat().filter(product => product.qty > 0);
    this.service.AddTableOrder(this.tableId, products).subscribe({
      next: () => {
        // Clear local storage for products after order is sent
        products.forEach(product => localStorage.removeItem(product.name));
        this.router.navigate(['tables/' + this.tableId + '/order']);
      }
    });
  }
}
