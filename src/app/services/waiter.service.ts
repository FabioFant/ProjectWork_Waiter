import { Injectable } from '@angular/core';
import Order from '../modules/Order';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor() { }

  GetAllTables(){}

  GetTableById(tableId: number) {}
  
  OpenTable(tableId: number, occupants: number) {}

  CloseTable(tableId: number) {}

  GetTableBill(tableId: number) {}

  GetTableOrder(tableId: number) {}

  AddTableOrder(tableId: number, order: Order[]) {}

  DeleteTableOrder(tableId: number, orderId: number) {}

  GetAllCategories(){}

  GetCategoryById(categoryId: number) {}
}
