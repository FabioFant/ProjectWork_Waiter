import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaiterService } from '../../services/waiter.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-table-detail',
  imports: [FormsModule, NgIf,QRCodeComponent],
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.css'
})
export class TableDetailComponent {
  tableId: number;
  occupied!: boolean;
  occupants: number = 0;
  errorMsg: string = '';
  qrcode: boolean = false;
  qrdata ="";

  constructor(private waiterService: WaiterService, private route: ActivatedRoute, private router: Router) {
    this.tableId = Number(this.route.snapshot.paramMap.get('id'));
    this.waiterService.GetTableById(this.tableId).subscribe(table => this.occupied = table.occupied);
  }

  checkOccupants() : boolean {
    let result = false;
    this.errorMsg = '';
    if (isNaN(Number(this.occupants)) || this.occupants < 1) {
      this.errorMsg = 'Please enter a valid number greater than 0';
    }
    else  result = true;
    return result;
  }

  showQrCode() {
    this.qrcode = true;
    this.waiterService.GetTableById(this.tableId).subscribe(table => this.qrdata = "https://customer-619967684868.us-central1.run.app/"+table.tableKey);
  }
  showOrder() {
    this.router.navigate(['tables', this.tableId, 'order']);
  }
  showBill() {
    this.router.navigate(['tables', this.tableId, 'bill']);
  }
  openTable() {
    this.waiterService.OpenTable(this.tableId, this.occupants).subscribe();
    this.showQrCode();
  }
  closeTable() {
    this.waiterService.CloseTable(this.tableId).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
