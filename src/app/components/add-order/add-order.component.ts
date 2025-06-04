import { Component } from '@angular/core';
import Category from '../../models/Category';
import Product from '../../models/Product';
import { WaiterService } from '../../services/waiter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent {
  categories:Category[] = [];
  productsForCategory: Product[][] = [[]];

  constructor(private service:WaiterService){
    this.service.GetAllCategories().subscribe({
      next: r => {
        this.categories = r;
        this.categories.forEach(category => {
          this.service.GetProductsByCategoryId(category.id).subscribe({
            next: products => {
              this.productsForCategory[category.id] = products;
            },
            error: e => alert("Error fetching products for category")
          });
        });
      },
      error: e => alert("Error fetching categories")
    });
  }
}
