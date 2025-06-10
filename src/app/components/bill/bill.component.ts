import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Order from '../../models/Order';
import { WaiterService } from '../../services/waiter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, interval, of, Subscription, switchMap } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-bill',
  imports: [CommonModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent implements OnInit, OnDestroy {
  private polling!: Subscription;
  loading = true;
  ordini:Order[]=[];
  bill:number=0;

  tableId: number

  constructor(private route:ActivatedRoute, private waiterService:WaiterService, private router: Router)
  {
    this.tableId = this.route.snapshot.params['id'];
    waiterService.GetTableBill(this.tableId).subscribe({
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
        switchMap(() => forkJoin({
          bill : this.waiterService.GetTableBill(this.tableId).pipe(
            // If the bill is asked to a closed table, an error will be thrown
            catchError(() => {
              return of(null); // Create a null observable
            })
          ),
          table : this.waiterService.GetTableById(this.tableId)
        }))
      )
      .subscribe({
        next: ({bill, table}) => {
          
          if(!table.occupied)
            this.router.navigate([''], {
              state: { tableClosed: true }
          });

          this.updateData(bill);
        },
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
