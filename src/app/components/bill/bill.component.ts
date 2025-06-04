import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Product from '../../models/Product';
import Order from '../../models/Order';
import { WaiterService } from '../../services/waiter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill',
  imports: [CommonModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {
  ordini?:Order[]=[];
  constructor(private route:ActivatedRoute, private waiterService:WaiterService)
  {
    waiterService.GetTableBill(route.snapshot.params['id']).subscribe(r => this.ordini=r?.orders);
  }
}
