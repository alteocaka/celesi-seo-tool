import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() logoutClicked = new EventEmitter();

  state$ = this.layoutState.state$;

  constructor(private layoutState: LayoutService, private router: Router) { }

  ngOnInit(): void {
  }

  setSidebar(sidebar: boolean): void {
     this.layoutState.setSidebar(sidebar);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    // localStorage.removeItem("expires_at");
    // this.authService.currentUserSubject.next(null);
  }

}
