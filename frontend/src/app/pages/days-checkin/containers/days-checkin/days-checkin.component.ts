import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DaysCheckinService } from '../../services/days-checkin.service';
import { AuthService } from '../../../../core/auth/auth.service';
import {MenuItem} from 'primeng/api';
import { ToObjectPipe } from 'src/app/core/pipes/toObject.pipe';

@Component({
  selector: 'app-days-checkin',
  templateUrl: './days-checkin.component.html',
  styleUrls: ['./days-checkin.component.css'],
})
export class DaysCheckinComponent implements OnInit {
  constructor(
    private router: Router,
    private daysCheckInService: DaysCheckinService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) { }

  display: any;
  urls: any;
  username: any;
  msgs: Message[] = [];
  user: any = null;
  items!: MenuItem[];

  ngOnInit(): void {
    // this.authService.currentUserValue1();
    this.urls = this.daysCheckInService.getUrls().subscribe(urls => {this.urls = urls});

    this.items = [
      {label: 'Meeting'},
      {
      items: [{
          label: 'Meeting Start',
          icon: 'pi pi-clock',
          command: () => {
              this.confirmMeetingStart()
          }
      },
      {
          label: 'Meeting Finish',
          icon: 'pi pi-clock',
          command: () => {
              this.confirmMeetingFinish()
          }
      }
      ]},
  ];

    this.authService.getLoggedInUser().subscribe((user: any) => {
      this.user = user;
      console.log(user);
    });

    return this.daysCheckInService.createDay();
  }
  returnCurrentTime() {
    var d = new Date,
      dformat =
        [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
    return dformat;
  }

  getUserData() {
    return this.authService.getLoggedInUser().subscribe((response: any) => {
      this.username = response;
      console.log(this.username);
    });
  }

  userDetails(user: any) {
    if (user && user.id) {
      this.router.navigate([`/user-details/${user.id}`]);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    // localStorage.removeItem("expires_at");
    // this.authService.currentUserSubject.next(null);
  }

  confirmJobStart() {
    this.confirmationService.confirm({
      message: 'A je i sigurt se do t?? konfirmosh orarin e fillimit t?? pun??s?',
      accept: () => {
        this.daysCheckInService.updateJobStart().subscribe(
          (day) => {
            this.msgs = [
              {
                severity: 'success',
                summary: 'Success!',
                detail: 'Orari ' + this.returnCurrentTime() + ' u regjistrua, pun?? t?? mbar??',
              },
            ];
            day
          },
          (error) => {
            this.msgs = [
              {
                severity: 'error',
                summary: 'I regjistruar!',
                detail: 'Ju e keni regjistruar orarin e hyrjes p??r sot!',
              },
            ];
          }
        );
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'N?? pritje!',
            detail: 'Orari ende nuk ??sht?? regjistruar!',
          },
        ];
      },
    });
  }

  confirmBreakStart() {
    this.confirmationService.confirm({
      message:
        'A je i sigurt se do t?? konfirmosh orarin e fillimit t?? pushimit?',
      accept: () => {
        this.daysCheckInService.updateBreakStart().subscribe(
          (day) => {
            this.msgs = [
              {
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Orari ' + this.returnCurrentTime() + ' u regjistrua, pushim t?? mbar??!',
              },
            ];
            day
          },
          (error) => {
            this.msgs = [
              {
                severity: 'error',
                summary: 'I regjistruar!',
                detail: 'Ju e keni regjistruar orarin e fillimit t?? pushimit p??r sot!',
              },
            ];
          }
        );
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'N?? pritje!',
            detail: 'Orari ende nuk ??sht?? regjistruar!',
          },
        ];
      },
    });
  }

  confirmBreakFinish() {
    this.confirmationService.confirm({
      message:
        'A je i sigurt se do t?? konfirmosh orarin e mbarimit t?? pushimit?',
      accept: () => {
        this.daysCheckInService.updateBreakFinish().subscribe(
          (day) => {
            this.msgs = [
              {
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Orari ' + this.returnCurrentTime() + ' u regjistrua, pun?? t?? mbar??!',
              },
            ];
            day
          },
          (error) => {
            this.msgs = [
              {
                severity: 'error',
                summary: 'I regjistruar!',
                detail: 'Ju e keni regjistruar orarin e mbarimit t?? pushimit p??r sot!',
              },
            ];
          }
        );
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'N?? pritje!',
            detail: 'Orari ende nuk ??sht?? regjistruar!',
          },
        ];
      },
    });
  }

  confirmJobFinish() {
    this.confirmationService.confirm({
      message: 'A je i sigurt se do t?? konfirmosh orarin e mbarimit t?? pun??s?',
      accept: () => {
        this.daysCheckInService.updateJobFinish().subscribe(
          (day) => {
            this.msgs = [
              {
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Orari ' + this.returnCurrentTime() + ' u regjistrua, ia kalofsh mir??!',
              },
            ];
            day
          },
          (error) => {
            this.msgs = [
              {
                severity: 'error',
                summary: 'I regjistruar!',
                detail: 'Ju e keni regjistruar orarin e mbarimit t?? pun??s p??r sot!',
              },
            ];
          }
        );
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'N?? pritje!',
            detail: 'Orari ende nuk ??sht?? regjistruar!',
          },
        ];
      },
    });
  }

  confirmMeetingStart() {
    this.confirmationService.confirm({
      message: 'A je i sigurt se do t?? konfirmosh orarin e fillimit t?? takimit?',
      accept: () => {
        this.daysCheckInService.updateMeetingStart().subscribe(
          (day) => {
            this.msgs = [
              {
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Fillimi i takimit ' +'(' + this.returnCurrentTime() + ')' + ' u regjistrua, pa?? fat!',
              },
            ];
            day
          },
          (error) => {
            this.msgs = [
              {
                severity: 'error',
                summary: 'I regjistruar!',
                detail: 'Ju keni ende nj?? takim aktiv! Klikoni fillimisht "Meeting Finish", m?? pas regjistroni nj?? t?? ri.',
              },
            ];
          }
        );
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'N?? pritje!',
            detail: 'Orari n?? pritje!',
          },
        ];
      },
    });
  }
  confirmMeetingFinish() {
    this.confirmationService.confirm({
      message: 'A je i sigurt se do t?? konfirmosh orarin e mbarimit t?? takimit?',
      accept: () => {
        this.daysCheckInService.updateMeetingFinish().subscribe(
          (day) => {
            this.msgs = [
              {
                severity: 'success',
                summary: 'Sukses!',
                detail: 'Takimi u mbyll! ' +'(' + this.returnCurrentTime() + ')' + ' Mund t?? regjistrosh nj?? tjet??r n?? ??do moment!',
              },
            ];
            day
          },
          (error) => {
            this.msgs = [
              {
                severity: 'error',
                summary: 'I regjistruar!',
                detail: 'Nuk ka takime aktive p??r momentin!',
              },
            ];
          }
        );
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'N?? pritje!',
            detail: 'Orari n?? pritje!',
          },
        ];
      },
    });
  }
}
