import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Book } from './store/models/book';
import { selectBooks, selectLoading } from './store/selectors/book.selector';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.books$ = this.store.select(selectBooks);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {}
}
