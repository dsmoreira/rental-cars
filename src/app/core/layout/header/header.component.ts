import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NavigationActions } from '../../../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  goHome(): void {
    this.store.dispatch(NavigationActions.navigationGo({ path: ['/'] }));
  }
}
