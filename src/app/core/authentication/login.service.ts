import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);
  protected readonly environment = environment;

  login(email: string, password: string, rememberMe = false) {
    return this.http.post<Token>(`${environment.apiUrl}/auth/login`, { email, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  getLoggedInUser() {
    console.log('getLoggedInUser: ', `${environment.apiUrl}/admin/user`);
    // console.log('BearerToken: ', getBearerToken())
    let accessToken = localStorage.getItem('central-user-token').access_token;
    console.log('Local Storage: ', accessToken);
    return this.http.get<User>(`${environment.apiUrl}/admin/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/user/menu').pipe(map(res => res.menu));
  }
}
