import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/tokens/ApiUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    @Inject(API_URL) private api: string,
    private http: HttpClient
  ) { }

  getUsers(page: number, rows: number, filter: string): Observable<any> {
    const path = `${this.api}/users?page=${page}&limit=${rows}&s={"username": {"$or": {"$isnull": true, "$cont": "${filter}"}}}`
    console.log(path)
    return this.http.get(path);
  }

  getUserDays(id: number, page: number, limit: number): Observable<any> {
    const path = `${this.api}/days?join=user&filter=user.id||$eq||${id}&page=${page}&limit=${limit}`;
    return this.http.get(path);
  }

  getUserDetails(id: number): Observable<any> {
    const path = `${this.api}/users/${id}`;
    return this.http.get(path);
  }

  createUser(payload: any): Observable<any> {
    const path = `${this.api}/users/`;
    return this.http.post(path, payload);
  }

  updateUser(id: number, payload: any): Observable<any> {
    const path = `${this.api}/users/${id}`;
    return this.http.patch(path, payload);
  }

  deleteUser(id: number): Observable<any> {
    const path = `${this.api}/users/soft-delete/${id}`;
    return this.http.delete(path);
  }

  getUserProfile(): Observable<any> {
    const path = `${this.api}/users/me`;
    return this.http.get(path);
  }

  getUserDaysCSV(id: number): Observable<any>{
    const path = `${this.api}/users/csv/${id}`;
    return this.http.get(path, {responseType: 'blob', headers: {'Accept': 'application/csv'}});
  }

}
