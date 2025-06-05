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
  loading = true;

  constructor(private route:ActivatedRoute, private service:WaiterService){
    this.tableId = this.route.snapshot.params["id"]
    this.getTableOrder();
  }
  getTableOrder(){
    this.service.GetTableOrder(this.tableId).subscribe({
      next: r => {
        this.ordini = r.orders;
        this.loading = false
      },
      error: e => {
        alert("Error fetching orders");
        this.loading = false;
      }
    })
  }
  deleteOrder(orderId: number) {
    this.service.DeleteTableOrderById(this.tableId, orderId).subscribe({
      next: () => {
        //togli l'ordine dalla lista egli ordini e dalla tabella
        this.ordini = this.ordini.filter(o => o.orderId != orderId);
      },
      error: e => alert("Error deleting order")
    });
  }
  
  deleteAllOrders() {
    this.service.DeleteAllTableOrders(this.tableId).subscribe({
      next: () => {
        //togli tutti gli ordini dalla lista e dalla tabella se non sono stati preparati
        this.ordini = this.ordini.filter(o => o.completionDate != null);
      },
      error: e => alert("Error deleting all orders")
    });
  }
}
