import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Details } from 'src/app/layout/user-details/details.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DaysCheckinService {
  constructor(private http: HttpClient) { }

  private readonly API = environment.api;

  // Method for getting urls:
  getUrls(){
    return this.http.get<any>(`${this.API}/url`)
  }

  // Method for initializing a day
  createDay() {
    this.http.post(`${this.API}/days`, null).subscribe((day) => day);
  }

  // Method for getting all users days
  getAllUsersDays() {
    return this.http.get(`${this.API}/users?join=days`);
  }

  // Method for getting one user days
  getOneUserDays(id: number) {
    return this.http.get(`${this.API}/users/${id}?join=days`);
  }

  // Method for deleting user's days
  delteOneUserDays(id: number) {
    return this.http.delete(`${this.API}/days/delete-days/${id}`)
  }

  // Method for deleting all days
  delteAllDays() {
    return this.http.delete(`${this.API}/days/delete/all`)
  }

  // ****************************************
  // Methods for updating the day properties:
  // ****************************************

  // Update day's comment:
  updateComment(id: any, payload: any) {
    return this.http
      .patch(`${this.API}/days/${id}`, { "comment": payload })
  }

  // Update Job Start Method
  updateJobStart() {
    return this.http
      .patch(`${this.API}/days/update/job_start`, null)
  }

  // Update Break Start Method
  updateBreakStart() {
    return this.http
      .patch(`${this.API}/days/update/break_start`, null)
  }

  // Update Break Finish Method
  updateBreakFinish() {
    return this.http
      .patch(`${this.API}/days/update/break_finish`, null)
  }

  // Update Job Finish Method
  updateJobFinish() {
    return this.http
      .patch(`${this.API}/days/update/job_finish`, null)
  }

  // Update Meeting Start Method
  updateMeetingStart() {
    return this.http
      .patch(`${this.API}/days/update/meeting_start`, null)
  }

  // Update Meeting Finish Method
  updateMeetingFinish() {
    return this.http
      .patch(`${this.API}/days/update/meeting_finish`, null)
  }
}
