import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit {

  @Input() data: any;
  @Input() paginator!: { page: number; count: number; total: number; pageCount: number};
  @Output() rowClicked = new EventEmitter();
  @Output() paginatorChanged = new EventEmitter();
  @Output() deleteClicked = new EventEmitter();
  @Output() deleteDaysClicked = new EventEmitter();
  @Output() excelClicked = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  userDetails(id: number): void {
    this.rowClicked.emit(id);
  }

}
