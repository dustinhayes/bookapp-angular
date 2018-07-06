import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { LIMIT } from '@bookapp-angular/core';
import { CREATE_BOOK_MUTATION, FREE_BOOKS_QUERY, PAID_BOOKS_QUERY, UPDATE_BOOK_MUTATION } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import { BookFilterInput } from '../models/book-filter.model';
import { Book, BooksResponse, CreateBookResponse } from '../models/book.model';

@Injectable()
export class BookService {
  constructor(private apollo: Apollo) {}

  create(book: Book) {
    return this.apollo.mutate<CreateBookResponse>({
      mutation: CREATE_BOOK_MUTATION,
      variables: {
        book
      }
    });
  }

  update(id: string, book: Book) {
    return this.apollo.mutate<CreateBookResponse>({
      mutation: UPDATE_BOOK_MUTATION,
      variables: {
        id,
        book
      }
    });
  }

  getBooks(
    paid: boolean,
    filter: BookFilterInput,
    orderBy = '',
    skip = 0,
    first = LIMIT
  ) {
    return this.apollo
      .query<BooksResponse>({
        query: paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY,
        variables: {
          paid,
          filter,
          skip,
          first,
          orderBy
        }
      })
      .pipe(map(res => res.data.books));
  }
}
