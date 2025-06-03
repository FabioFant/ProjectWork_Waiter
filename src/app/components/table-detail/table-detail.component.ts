import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { WaiterService } from '../../services/waiter.service';
import { OrderComponent } from '../order/order.component';
import { TablesComponent } from '../tables/tables.component';


@Component({
  selector: 'app-table-detail',
  imports: [],
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.css'
})
export class TableDetailComponent {
  tableId: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.tableId = Number(this.route.snapshot.paramMap.get('id'));
  }

  showQrCode() {
    this.router.navigate(['tables', this.tableId, 'qrcode']);
  }
  showOrder() {
    this.router.navigate(['tables', this.tableId, 'order']);
  }
  showBill() {
    this.router.navigate(['tables', this.tableId, 'bill']);
  }
  closeTable() {
    this.router.navigate(['']);
  }
}
