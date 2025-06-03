import { Injectable } from '@angular/core';
import Order from '../modules/Order';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import Table from '../modules/Table';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({   // VA TOLTO SERVE SOLO PER TESTARE LE RICHIESTE PRIMA DI IMPLEMENTARE L'INTERCEPTOR
    'Authorization': `Bearer ${enviroment.token}`
  });
  GetAllTables(){
    
    return this.http.get<Table[]>(`${enviroment.apiUrl}/waiters/tables`,{headers: this.headers});
  }

  GetTableById(tableId: number) {

  }
  
  OpenTable(tableId: number, occupants: number) {}

  CloseTable(tableId: number) {}

  GetTableBill(tableId: number) {}

  GetTableOrder(tableId: number) {}

  AddTableOrder(tableId: number, order: Order[]) {}

  DeleteTableOrder(tableId: number, orderId: number) {}

  GetAllCategories(){}

  GetCategoryById(categoryId: number) {}
}
