import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaiterService } from '../../services/waiter.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';
import { interval, Subscription, switchMap } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-table-detail',
  imports: [FormsModule, NgIf, QRCodeComponent],
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.css'
})
export class TableDetailComponent implements OnInit, OnDestroy {
  private polling?: Subscription;

  tableId: number;
  occupied!: boolean;
  occupants: number = 0;
  errorMsg: string = '';
  qrcode: boolean = false;
  qrdata = "";
  loading = true;

  constructor(private waiterService: WaiterService, private route: ActivatedRoute, private router: Router) {
    this.tableId = Number(this.route.snapshot.paramMap.get('id'));
    this.waiterService.GetTableById(this.tableId).subscribe({
        next: table => {
          this.occupied = table.occupied;
          this.loading = false;
        },
        error: err => {console.error('Table Not Found', err); router.navigate(['notFound'])}
      });
  }

  checkOccupants(): boolean {
    let result = false;
    this.errorMsg = '';
    if (isNaN(Number(this.occupants)) || Number(this.occupants) < 1) {
      this.errorMsg = 'Please enter a valid number greater than 0';
    }
    else result = true;
    return result;
  }

  loadingQr = false;

  showQrCode() {
    this.qrcode = true;
    this.qrdata = ""; // Clear previous QR data
    this.loadingQr = true;
    this.waiterService.GetTableById(this.tableId).subscribe(table => {
      this.qrdata = "https://customer-619967684868.us-central1.run.app/" + table.tableKey;
      this.loadingQr = false;
    });
  }
  showOrder() {
    this.router.navigate(['tables', this.tableId, 'order']);
  }

  showBill() {
    this.router.navigate(['tables', this.tableId, 'bill']);
  }

  openTable() {
    this.waiterService.OpenTable(this.tableId, this.occupants).subscribe({
      next:() => {
        this.loading = false;
        this.showQrCode();
      },
      error: () => {
        this.loading = false;
        alert('Error opening table');
      }
    });
  }

  closeTable() {
    this.loading = true; // Show loader
    this.waiterService.CloseTable(this.tableId).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: () => {
        this.loading = false; // Hide loader if there's an error
        alert('Error closing table');
      }
    });
  }

  ngOnInit() 
  {
    this.polling = interval(enviroment.pollingInterval)
      .pipe(
        switchMap(() => this.waiterService.GetTableById(this.route.snapshot.params['id']))
      )
      .subscribe({
        next: r => {
          // Redirect only if the table goes from occupied to unoccupied
          if(this.occupied && !r.occupied)
            this.router.navigate([''], {
              state: { tableClosed: true }
            });
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
