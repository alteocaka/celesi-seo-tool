import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../tokens/ApiUrl';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserValue() {
    return localStorage.getItem('currentUser');
  }

  constructor(
    @Inject(API_URL) private api: string,
    private http: HttpClient,
    private router: Router
  ) {}

  // public get currentUserValue1(): any {
  //   return this.currentUserSubject;
  // }

  // login(username: string, password: string) {
  //   return this.http
  //     .post(`${this.API}/auth/login`, { username, password }).pipe(tap((user: any) => {
  //       localStorage.setItem('currentUser', user.access_token);
  //       this.currentUserSubject.next(user);
  //     }))

  // }

  login(username: string, password: string) {
    return this.http.post(`${this.api}/auth/login`, { username, password });
  }

  setUserLocalStorage(token: string): void {
    localStorage.setItem('currentUser', token);
  }

  getLoggedInUser() {
    return this.http.get(`${this.api}/users/me`);
  }
}
