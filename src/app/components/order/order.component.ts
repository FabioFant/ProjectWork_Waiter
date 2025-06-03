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
  }
  GetTableOrder(){
    /*this.service.GetTableOrder(this.tableId).subscribe({
      next:r => this.ordini = r,
      error:
    })*/
  }

}
