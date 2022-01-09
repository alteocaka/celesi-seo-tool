import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DaysCheckinService } from 'src/app/pages/days-checkin/services/days-checkin.service';

@Component({
  selector: 'app-user-profile-days-table',
  templateUrl: './user-profile-days-table.component.html',
  styleUrls: ['./user-profile-days-table.component.css'],
})
export class UserProfileDaysTableComponent implements OnInit {
  @Input() days: any;
  @Input() paginator!: {
    page: number;
    count: number;
    total: number;
    pageCount: number;
  };
  @Output() rowClicked = new EventEmitter();
  @Output() paginatorChanged = new EventEmitter();

  statuses: any[] | undefined;

  clear(table: any) {
    table.clear();
  }

  exportexcel() {
    return;
  }

  async updateComment(id: any, payload: any) {
    console.log(id, payload);
    return await this.service
      .updateComment(id, payload)
      .subscribe((result) => result);
  }

  constructor(private service: DaysCheckinService) {}

  ngOnInit(): void {}
}
