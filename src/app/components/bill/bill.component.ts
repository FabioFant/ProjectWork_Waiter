import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Product from '../../models/Product';
import Order from '../../models/Order';
import { WaiterService } from '../../services/waiter.service';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subscription, switchMap } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';
import Table from '../../models/Table';

@Component({
  selector: 'app-bill',
  imports: [CommonModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {
  private polling!: Subscription;
  loading = true;
  ordini:Order[]=[];
  bill:number=0;
  constructor(private route:ActivatedRoute, private waiterService:WaiterService)
  {
    waiterService.GetTableBill(route.snapshot.params['id']).subscribe({
      next: r => {this.updateData(r); this.loading = false},
      error: err => {console.error('Fetch error:', err); this.loading = false}
    });
  }

  updateData(data: any) 
  {
    let currBill = 0;

    this.ordini=data.orders;
    for(let i=0;i<this.ordini.length;i++)
    {
      this.ordini[i].total=Math.floor(this.ordini[i].product.price*this.ordini[i].product.qty*100)/100;
      currBill+=this.ordini[i].total;
    }

    this.bill = Math.floor(currBill * 100) / 100;
  }

  ngOnInit() 
  {
    this.polling = interval(enviroment.pollingInterval)
      .pipe(
        // New request while ignoring the previous one if it hasn't completed yet
        switchMap(() => this.waiterService.GetTableBill(this.route.snapshot.params['id']))
      )
      .subscribe({
        next: r => this.updateData(r),
        error: err => console.error('Polling error:', err)
      });
  }

  ngOnDestroy() 
  {
    if( this.polling ) {
      this.polling.unsubscribe();
    }
  }
}
