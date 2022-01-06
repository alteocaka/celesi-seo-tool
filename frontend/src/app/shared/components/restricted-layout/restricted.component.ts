import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restricted-layout',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.css']
})
export class RestrictedComponent implements OnInit {

  displayBasic: boolean = false;
  constructor() { }

  showBasicDialog() {
    this.displayBasic = true;
  }

  ngOnInit(): void {
    return this.showBasicDialog()
  }

}
