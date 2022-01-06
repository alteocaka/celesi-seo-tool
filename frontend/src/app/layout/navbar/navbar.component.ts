import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  state$ = this.layoutState.state$;

  constructor(private layoutState: LayoutService) { }

  ngOnInit(): void {
  }

  setSidebar(sidebar: boolean): void {
    this.layoutState.setSidebar(sidebar);
  }

}
