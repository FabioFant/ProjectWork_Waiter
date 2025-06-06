import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from "rxjs";
import { AuthToken } from "../models/AuthToken";
import { enviroment } from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private jwtHelper = new JwtHelperService();

  constructor(private http : HttpClient) { }

  login(username:string ,password:string)
  {
    return this.http.post<AuthToken>(enviroment.apiUrl + '/login',{ "username":username, "password":password }).pipe(
      tap(t=> this.saveToken(t))
    )
  }

  logout()
  { 
    return this.http.post(enviroment.apiUrl + '/logout',{}).pipe(
      tap(()=> this.deleteToken())
    )
  }

  private saveToken(token : AuthToken)
  {
    localStorage.setItem('token', token.token);
  }

  private deleteToken()
  {
    localStorage.clear();
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  isLogged()
  {
    var token = localStorage.getItem('token');
    if( !token ) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  getFieldFromToken()
  {
    var token = localStorage.getItem('token');
    if( !token || !this.isLogged() ) return 0;

    const decodedToken = this.jwtHelper.decodeToken(token);
    if( decodedToken && decodedToken.field ) return decodedToken.field;
    return 0;
  }
}