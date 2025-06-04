import { Injectable } from '@angular/core';
import Order from '../models/Order';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import Table from '../models/Table';
import Category from '../models/Category';
import Product from '../models/Product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(private http: HttpClient) { }

  GetAllTables() :Observable<Table[]> {
    
    return this.http.get<Table[]>(`${enviroment.apiUrl}/waiter/tables`);
  }

  GetTableById(tableId: number) : Observable<Table> {
    return this.http.get<Table>(`${enviroment.apiUrl}/waiter/tables/${tableId}`);
  }
  
  OpenTable(tableId: number, occupants: number) {
    const body={
      "id": tableId,
      "occupied": true,
      "occupants": occupants
    }

    return this.http.put(`${enviroment.apiUrl}/waiter/tables/${tableId}`, body);
  }

  CloseTable(tableId: number) {
    const body = {
      "id": tableId,
      "occupied": false,
    }

    return this.http.put(`${enviroment.apiUrl}/waiter/tables/${tableId}`, body);
  }

  GetTableBill(tableId: number) : Observable<any> {
    return this.http.get<any>(`${enviroment.apiUrl}/waiter/tables/${tableId}/bill`).pipe(
      map(res => ({
        tableId:res.tableId,
        occupants: res.occupants,
        totalPrice: res.totalPrice,
        orders: res.orders
      }))
    )
  }

  GetTableOrder(tableId: number) : Observable<any> {
    return this.http.get<any>(`${enviroment.apiUrl}/waiter/tables/${tableId}/order`).pipe(
      map(res => ({
        tableId:res.tableId,
        occupants: res.occupants,
        totalPrice: res.totalPrice,
        orders: res.orders
      }))
    )
  }

  AddTableOrder(tableId: number, product: Product[]) {
    const body = product.map(item => ({
      productId: item.id,
      qty: item.qty,
    }));

    return this.http.post(`${enviroment.apiUrl}/waiter/tables/${tableId}/order`, body);
  }

  DeleteAllTableOrders(tableId: number) {
    return this.http.delete(`${enviroment.apiUrl}/waiter/tables/${tableId}/order`);
  }

  DeleteTableOrderById(tableId: number, orderId: number) {
    return this.http.delete(`${enviroment.apiUrl}/waiter/tables/${tableId}/order/${orderId}`);
  }

  GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${enviroment.apiUrl}/waiter/categories`);
  }

  GetCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${enviroment.apiUrl}/waiter/categories/${categoryId}`);
  }

  GetProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${enviroment.apiUrl}/waiter/categories/${categoryId}/products`);
  }
}
