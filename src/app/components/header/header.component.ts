import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.casa=true;
        this.messaggio="Tables";
        let url=event.url;
        //console.log('URL aggiornato:', url);
        let urlSeparato=url.split('/');
        let indice=-1;
        for(let i=0;i<urlSeparato.length;i++)
        {
          if(urlSeparato[i]=="tables")
          {
            indice=i;
            break;
          }
        }
        if(indice!=-1)
        {
          this.messaggio="Table "+urlSeparato[indice+1];
          if(indice+1!=urlSeparato.length-1)
          {
            this.messaggio+=" - "+urlSeparato[indice+2];
            this.casa=false;
            this.id=parseInt(urlSeparato[indice+1]);
          }
        }
      }
    });
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
