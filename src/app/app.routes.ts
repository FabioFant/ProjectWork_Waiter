import { Routes } from '@angular/router';
import { TablesComponent } from './components/tables/tables.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { TableDetailComponent } from './components/table-detail/table-detail.component';
import { BillComponent } from './components/bill/bill.component';
import { OrderComponent } from './components/order/order.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { QRCodeComponent } from 'angularx-qrcode';

// TODO : Add auth guards
export const routes: Routes = [
    { path: '', component: TablesComponent,  },
    { path: 'login', component: LoginComponent,  },
    { path: 'tables/:id', component: TableDetailComponent,  },
    { path: 'tables/:id/bill', component: BillComponent,  },
    { path: 'tables/:id/qrcode', component: QRCodeComponent,  },
    { path: 'tables/:id/order', component: OrderComponent,  },
    { path: 'tables/:id/order/add', component: AddOrderComponent,  },
    { path: '**', component: NotfoundComponent,  },
];
