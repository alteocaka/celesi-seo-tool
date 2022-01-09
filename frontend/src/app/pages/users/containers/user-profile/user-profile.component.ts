import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { pluck, switchMap, take, tap } from 'rxjs/operators';
import {saveAs} from 'file-saver';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.css' ]
})
export class UserProfileComponent implements OnInit {

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

  days$ = this.usersService.getUserProfile().pipe(
    pluck('id'),
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
    this.days$ = this.usersService.getUserProfile().pipe(
      pluck('id'),
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

  userInformation$ = this.usersService.getUserProfile().pipe(
    take(1), switchMap((user) =>
      this.usersService.getUserDays(user.id, 1, 10)));

  constructor(
    private usersService: UsersService,
  private route: ActivatedRoute,
  private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  downloadCSV(id: any): void {
    this.usersService.getUserDaysCSV(id).pipe(take(1)).subscribe(res => {
      saveAs(res, 'user-data.csv');
    })
  }

}
