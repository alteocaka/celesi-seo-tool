import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFormComponent implements OnInit {


  @Input() userId!: number;
  @Input() userDetails: any;
  @Output() submitted = new EventEmitter

  form = this.fb.group({
    username: [null, Validators.required],
    role: ['1', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.userDetails) {
    this.form.patchValue(this.userDetails);
    }
  }

}
