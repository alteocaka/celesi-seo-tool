import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { API_URL } from 'src/app/core/tokens/ApiUrl';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  constructor(
    @Inject(API_URL) private api: string,
    private http: HttpClient,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleCreateUser(payload: any) {
    this.usersService.createUser(payload).subscribe(
      (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sukses!',
          detail: 'Përdoruesi u shtua me sukses!',
        });
        this.router.navigateByUrl('users');
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.error.message,
        });
      }
    );
  }
}
