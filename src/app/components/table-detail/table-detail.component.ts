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
  constructor(private waiterService: WaiterService, private router: Router,private route :ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.tableId = Number(params.get('id'));
    })
  }
  Order() {
    this.router.navigate([OrderComponent]);
  }
  QrCode() {
    this.router.navigate(['/qr-code']);
  }
  Close(){
    this.waiterService.CloseTable(this.tableId);
    this.router.navigate([TablesComponent]);
  }
}
