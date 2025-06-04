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

  messaggio:string;
  id?:number;
  constructor (private route:ActivatedRoute, private router:Router, private authService:AuthService)
  {
    this.messaggio=" ";
    let urlSeparato=window.location.href.split('/');
    let indice=-1;
    for(let i=0;i<urlSeparato.length;i++)
    {
      if(urlSeparato[i]=='tables')
      {
        indice=i;
        break;
      }
    }
    if(indice==-1)
    {
      this.messaggio="Tables";
    }
    else
    {
      this.messaggio="Table "+urlSeparato[indice+1];
      if((indice+1)<urlSeparato.length-1)
      {
        this.messaggio+=" - "+urlSeparato[indice+2];
      }
    }
    console.log(window.location.href);
  }

  Logout()
  {
    this.authService.logout().subscribe( r => this.router.navigate(['login']));
  }
}
