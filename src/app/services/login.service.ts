import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface TokenResponse {
  bearerToken: string;
  username: string;
  roles: string[];
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private loginStatus = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatus.asObservable();

  baseUrl = 'http://localhost:8080';

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  login(tokenRes: TokenResponse) {
    localStorage.setItem('token', tokenRes.bearerToken);
    localStorage.setItem('username', tokenRes.username);
    localStorage.setItem('roles', tokenRes.roles.toString());
    // localStorage.setItem('roles', JSON.stringify(response.roles));
    this.setLoginStatus(true);
    return true;
  }

  generateToken(credential: any): Observable<TokenResponse> {
    let url = this.baseUrl + '/auth/signin';
    return this.http.post<TokenResponse>(url, credential);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.setLoginStatus(false);
    return true;
  }

  isLogin() {
    let token = localStorage.getItem('token');
    if (token == null || token === '' || token == undefined) {
      return false;
    }
    return true;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
