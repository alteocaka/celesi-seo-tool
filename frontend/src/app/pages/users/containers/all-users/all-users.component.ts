import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  take,
  tap,
} from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { toR3Reference } from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DaysCheckinService } from 'src/app/pages/days-checkin/services/days-checkin.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  paginator: { page: number; count: number; total: number; pageCount: number } =
    {
      page: 1,
      count: 10,
      total: 0,
      pageCount: 0,
    };

  filter = '';

  data$ = this.usersService
    .getUsers(this.paginator.page, this.paginator.count, this.filter)
    .pipe(
      catchError((error) => {
        // this.messageService.add
        return throwError(error);
      }),
      tap((result) => {
        if (result) {
          this.paginator = {
            ...this.paginator,
            page: result.page,
            total: result.total,
            pageCount: result.pageCount,
          };
        }
      })
    );

  filterChanged = new BehaviorSubject<any>('');

  filterChanged$ = this.filterChanged.pipe(
    debounceTime(1500),
    distinctUntilChanged(),
    tap((event: any) => {
      if (event) {
        this.handleFilterChange(event.target.value);
      }
    })
  );

  constructor(
    private usersService: UsersService,
    private daysService: DaysCheckinService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  handleRowClicked(id: number) {
    this.router.navigateByUrl(`users/details/${id}`);
  }

  handlePaginatorChange(paginator: any): void {
    console.log(paginator);
    this.data$ = this.usersService
      .getUsers(paginator.page + 1, paginator.rows, this.filter)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        tap((result) => {
          if (result) {
            this.paginator = {
              count: paginator.rows,
              page: result.page,
              total: result.total,
              pageCount: result.pageCount,
            };
          }
        })
      );
  }

  handleFilterChange(filter: string): void {
    console.log(this.paginator);
    this.data$ = this.usersService
      .getUsers(this.paginator.page, this.paginator.count, filter)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        tap((result) => {
          if (result) {
            this.paginator = {
              count: this.paginator.count,
              page: 1,
              total: result.total,
              pageCount: result.pageCount,
            };
          }
        })
      );
  }

  handleDeleteClicked(userId: number): void {
    this.confirmationService.confirm({
      message: 'A je i sigurt se do të fshish profilin e përdoruesit?',
      header: 'Konfirmim!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService
          .deleteUser(userId)
          .pipe(take(1))
          .subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Përdoruesi dhe rekordet e tij u fshinë nga sistemi.',
              });
              this.data$ = this.usersService
                .getUsers(
                  this.paginator.page,
                  this.paginator.count,
                  this.filter
                )
                .pipe(
                  catchError((error) => {
                    return throwError(error);
                  }),
                  tap((result) => {
                    if (result) {
                      this.paginator = {
                        ...this.paginator,
                        page: result.page,
                        total: result.total,
                        pageCount: result.pageCount,
                      };
                    }
                  })
                );
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: error.error.message,
              });
            }
          );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'U refuzua!',
          detail: 'Profili i përdoruesit është ende aktiv.',
        });
      },
    });
  }

  handleDeleteDaysClicked(userId: number): void {
    this.confirmationService.confirm({
      message: 'A je i sigurt se do të fshish të gjitha ditët e përdoruesit në databazë? Kujdes, ky veprim nuk është i rikuperueshëm!',
      header: 'Konfirmim!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.daysService
          .delteOneUserDays(userId)
          .pipe(take(1))
          .subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Ditët e përdoruesit u fshinë nga sistemi.',
              });
              this.data$ = this.usersService
                .getUsers(
                  this.paginator.page,
                  this.paginator.count,
                  this.filter
                )
                .pipe(
                  catchError((error) => {
                    return throwError(error);
                  }),
                  tap((result) => {
                    if (result) {
                      this.paginator = {
                        ...this.paginator,
                        page: result.page,
                        total: result.total,
                        pageCount: result.pageCount,
                      };
                    }
                  })
                );
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: error.error.message,
              });
            }
          );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'U refuzua!',
          detail: 'Ditët e përdoruesit janë ende në databazë.',
        });
      },
    });
  }

  deleteAllDays(): void {
    this.confirmationService.confirm({
      message: 'A je i sigurt se do të fshish të gjitha ditët në databazë? Kujdes, ky veprim nuk është i rikuperueshëm!',
      header: 'Konfirmim!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.daysService
          .delteAllDays()
          .subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Ditët e të gjithë përdoruesëve u fshinë nga sistemi.',
              });
              this.data$ = this.usersService
                .getUsers(
                  this.paginator.page,
                  this.paginator.count,
                  this.filter
                )
                .pipe(
                  catchError((error) => {
                    return throwError(error);
                  }),
                  tap((result) => {
                    if (result) {
                      this.paginator = {
                        ...this.paginator,
                        page: result.page,
                        total: result.total,
                        pageCount: result.pageCount,
                      };
                    }
                  })
                );
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: error.error.message,
              });
            }
          );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'U refuzua!',
          detail: 'Ditët e përdoruesëve janë ende në databazë.',
        });
      },
    });
  }

  handleExcelClicked(userId: number) {
    this.usersService
      .getUserDaysCSV(userId)
      .pipe(take(1))
      .subscribe((res) => {
        saveAs(res, 'user-data.csv');
      });
  }
}
