import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WaiterService } from '../../services/waiter.service';
import Order from '../../models/Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [RouterModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  tableId:number;
  ordini:Order[] = [];

  constructor(private route:ActivatedRoute, private service:WaiterService){
    this.tableId = this.route.snapshot.params["id"]
    this.getTableOrder();
  }
  getTableOrder(){
    this.service.GetTableOrder(this.tableId).subscribe({
      next: r => {this.ordini = r.orders; console.dir(this.ordini)},
      error: e => alert("Error fetching orders")
    })
  }
  deleteOrder(orderId: number) {
    this.service.DeleteTableOrderById(this.tableId, orderId).subscribe({
      next: () => {
        //togli l'ordine dalla lista egli ordini e dalla tabella
        this.ordini = this.ordini.filter(o => o.orderId != orderId);
        //document.getElementById(`order-${orderId}`)?.remove();
      },
      error: e => alert("Error deleting order")
    });
  }
}
