import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, map, pluck, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, throwError } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  filter = '';

  paginator: { page: number; count: number; total: number; pageCount: number } = {
    page: 1,
    count: 10,
    total: 0,
    pageCount: 0
  };

  fileName = 'User_Data.xlsx';

  user$ = this.route.params.pipe(
    pluck('userId'),
    switchMap(id => this.usersService.getUserDetails(id)))

  days$ = this.route.params.pipe(
    pluck('userId'),
    switchMap(id => this.usersService.getUserDays(id, 1, 10)),
    tap(result => {
      if(result) {
        this.paginator = {
          ...this.paginator,
          page: result.page,
          total: result.total,
          pageCount: result.pageCount
        }
      }

    })

  )




  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  handleFilterChange(filter: string): void {
    if(!filter) {
      return;
    }
    console.log(filter)
  };

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  handleRowClicked(id: number) {
    this.exportexcel()
  }

  handlePaginatorChange(paginator: any): void {
    console.log(paginator);
    this.days$ = this.route.params.pipe(
      pluck('userId'),
      switchMap(id => this.usersService.getUserDays(id, paginator.page + 1, paginator.rows)),
      tap(result => {
        this.paginator = {
          count: paginator.rows,
          page: result.page,
          total: result.total,
          pageCount: result.pageCount
        }
      })

    )
  }




  ngOnInit(): void {
  }

}
