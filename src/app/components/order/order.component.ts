import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WaiterService } from '../../services/waiter.service';
import Order from '../../models/Order';
import { CommonModule } from '@angular/common';
import { interval, Observable, Subscription, switchMap } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-order',
  imports: [RouterModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, OnDestroy {
  private polling!: Subscription;

  tableId: number;
  ordini: Order[] = [];
  loading = true;
  disabled = false;
  ordiniFiniti: Order[] = [];

  constructor(private route: ActivatedRoute, private service: WaiterService) {
    this.tableId = this.route.snapshot.params["id"]
    this.service.GetTableOrder(this.tableId).subscribe({
      next: r => {
        this.updateData(r);
      },
      error: e => {
        alert("Error fetching orders");
        this.loading = false;
      }
    })
  }

  deleteOrder(orderId: number) {
    this.disabled = true;
    this.service.DeleteTableOrderById(this.tableId, orderId).subscribe({
      next: () => {
        //togli l'ordine dalla lista egli ordini e dalla tabella
        this.ordini = this.ordini.filter(o => o.orderId != orderId);
        this.disabled = false;
      },
      error: e => {alert("Error deleting order"); this.disabled = false;}
    });
  }

  deleteAllOrders() {
    this.loading = true;
    this.service.DeleteAllTableOrders(this.tableId).subscribe({
      next: () => {
        //togli tutti gli ordini dalla lista e dalla tabella se non sono stati preparati
          this.service.GetTableOrder(this.tableId).subscribe({
            next: r => this.updateData(r),
            error: err => console.error('Polling error:', err)
          });
        this.loading = false;
      },
      error: e => {
        alert("Error deleting all orders")
        this.loading = false;
      }
    });
  }

  updateData(data: any)
  {
    this.ordini = data.orders;
    this.ordiniFiniti = this.ordini.filter(o => o.completionDate == null);
    this.loading = false
  }

  ngOnInit(): void 
  {
    this.polling = interval(enviroment.pollingInterval)
      .pipe(
        // New request while ignoring the previous one if it hasn't completed yet
        switchMap(() => this.service.GetTableOrder(this.tableId))
      )
      .subscribe({
        next: r => this.updateData(r),
        error: err => console.error('Polling error:', err)
      });
  }

  ngOnDestroy(): void 
  {
    if( this.polling ) {
      this.polling.unsubscribe();
    }
  }
}
