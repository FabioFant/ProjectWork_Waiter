import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WaiterService } from '../../services/waiter.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-table-detail',
  imports: [FormsModule, NgIf],
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.css'
})
export class TableDetailComponent {
  tableId: number;
  occupied!: boolean;
  occupants: number = 0;
  errorMsg: string = '';

  constructor(private waiterService: WaiterService, private route: ActivatedRoute, private router: Router) {
    this.tableId = Number(this.route.snapshot.paramMap.get('id'));
    this.waiterService.GetTableById(this.tableId).subscribe(table => this.occupied = table.occupied);
  }

  checkOccupants() {
    this.errorMsg = '';
    if (isNaN(Number(this.occupants)) || this.occupants < 1) {
      this.errorMsg = 'Please enter a valid number greater than 0';
    }
  }

  showQrCode() {
    this.router.navigate(["tables", this.tableId, "qrcode"]);
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
