import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';
import { TablesComponent } from '../tables/tables.component';
import { TableDetailComponent } from '../table-detail/table-detail.component';
import { BillComponent } from '../bill/bill.component';
import { OrderComponent } from '../order/order.component';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  messaggio="Tables";
  casa=true;
  id?:number;
  constructor (private router:Router, private authService:AuthService)
  {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getCurrentRoute(this.router.routerState.root);
        let componente=currentRoute.component;
        switch(componente)
        {
          case TablesComponent:
          {
            this.casa=true;
            this.messaggio="Tables";
            break;
          }
          case TableDetailComponent:
          {
            this.casa=true;
            this.messaggio="Table "+currentRoute.url[1];
            this.id=currentRoute.url[1];
            break;
          }
          case BillComponent:
          {
            this.casa=false;
            this.messaggio="Table "+currentRoute.url[1]+" - Bill";
            this.id=currentRoute.url[1];
            break;
          }
          case OrderComponent:
          {
            this.casa=false;
            this.messaggio="Table "+currentRoute.url[1]+" - Order";
            this.id=currentRoute.url[1];
            break;
          }
          case AddOrderComponent:
          {
            this.casa=false;
            this.messaggio="Table "+currentRoute.url[1]+" - Add";
            this.id=currentRoute.url[1];
            break;
          }
        }
      });
  }
  private getCurrentRoute(route: ActivatedRoute): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot;
  }

  Logout()
  {
    this.authService.logout().subscribe( r => this.router.navigate(['login']));
  }

  Indietro()
  {
    this.router.navigate([`/tables/${this.id}`]);
  }
}
