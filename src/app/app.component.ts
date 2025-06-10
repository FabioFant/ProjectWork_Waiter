import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { NotfoundComponent } from './components/notfound/notfound.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectWork_Waiter';
  showHeader = true;
  constructor(public authService: AuthService, private router:Router)
  {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getCurrentRoute(this.router.routerState.root);
        this.showHeader = currentRoute.component !== NotfoundComponent;
      });
  }
  private getCurrentRoute(route: ActivatedRoute): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot;
  }
}
