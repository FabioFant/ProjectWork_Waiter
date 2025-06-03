import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  url:string;
  messaggio:string;
  id?:number;
  constructor (private route:ActivatedRoute, private router:Router, private authService:AuthService)
  {
    this.url="";
    console.log(router.url);
    this.messaggio="";
  }

  Logout()
  {
    this.authService.logout().subscribe( r => this.router.navigate(['login']));
  }
}
