import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {

  @Output() createRequest = new EventEmitter();

  // @TODO Hiq decoratorin nga forma dhe krijo output me vete
  @Output()
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('1')
  });

  constructor() { }

  ngOnInit(): void {
  }

}
