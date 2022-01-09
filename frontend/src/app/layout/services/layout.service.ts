import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  layoutState = new BehaviorSubject<{sidebar: boolean}>({sidebar: false});

  state$ = this.layoutState.asObservable();

  constructor() {
  }

  get state(): {sidebar: boolean} {
    return this.layoutState.getValue();
  }

  setSidebar(sidebar: boolean): void {
    this.layoutState.next({...this.state, sidebar});
  }
}
