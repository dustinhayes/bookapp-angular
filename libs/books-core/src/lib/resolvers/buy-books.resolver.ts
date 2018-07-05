import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { FILTER_KEYS, ListResponse, StoreService } from '@bookapp-angular/core';

import { Book } from '../models/book.model';
import { BookService } from '../services';

@Injectable()
export class BuyBooksResolver implements Resolve<ListResponse<Book[]>> {
  constructor(
    private bookService: BookService,
    private storeService: StoreService
  ) {}

  resolve(): Observable<ListResponse<Book[]>> {
    const filter = this.storeService.get(FILTER_KEYS.BUY_BOOKS);

    const searchValue = (filter && filter.searchValue) || '';
    const sortValue = (filter && filter.sortValue) || '';

    return this.bookService.getBooks(
      { paid: true, field: 'title', search: searchValue },
      null,
      null,
      sortValue
    );
  }
}
