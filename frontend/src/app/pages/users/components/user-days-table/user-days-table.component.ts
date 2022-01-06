import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-days-table',
  templateUrl: './user-days-table.component.html',
  styleUrls: ['./user-days-table.component.css']
})
export class UserDaysTableComponent implements OnInit {
  @Input() days: any;
  @Input() paginator!: { page: number; count: number; total: number; pageCount: number};
  @Output() rowClicked = new EventEmitter();
  @Output() paginatorChanged = new EventEmitter();


  constructor() { }

  exportexcel(){
    this.rowClicked.emit()
  }

  ngOnInit(): void {
  }

}
