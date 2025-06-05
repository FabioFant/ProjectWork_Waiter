import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = ""
  password = ""
  errorMessage = ""

  // costruttore
  constructor(private authService: AuthService, private router: Router) 
  {
    if( authService.isLogged() ) router.navigate(['/'])
  }

  // login
  login()
  {
    this.errorMessage = ""
    this.authService.login(this.username, this.password).subscribe({
      next: r => this.router.navigate(['/']),
      error: e => this.errorMessage = 'Credenziali non valide. Riprova.'
    })
  }
}