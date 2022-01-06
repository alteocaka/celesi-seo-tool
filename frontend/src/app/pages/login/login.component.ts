import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  // login() {
  //   const value = this.loginForm.value;
  //   this.authService
  //     .login(value.username, value.password)
  //     .subscribe((user: any) => {
  //       this.router.navigateByUrl('/');
  //     });
  // }

  login() {
    const value = this.loginForm.value;
    this.authService.login(value.username, value.password).pipe(take(1))
      .subscribe((user: any) => {
        console.log(user);
        this.router.navigateByUrl('/');
        this.authService.setUserLocalStorage(user.access_token)
        console.log(localStorage.getItem('currentUser'));
        return user;
      }, error => {
        console.log(error)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message })
      })
    // this.router.navigate(['/']);
  }

  ngOnInit(): void { }

}
