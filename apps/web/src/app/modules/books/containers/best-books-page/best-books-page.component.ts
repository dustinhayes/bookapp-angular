import { Component } from '@angular/core';

import { BestBooksPageBaseComponent } from '@bookapp-angular/books-core';

import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './best-books-page.component.html',
  styleUrls: ['./best-books-page.component.scss']
})
export class BestBooksPageComponent extends BestBooksPageBaseComponent {
  constructor(protected apollo: Apollo) {
    super();
  }

  protected handleBooksChanges({ data, loading }) {
    this.isLoading = loading;
    if (loading) {
      return;
    }

    this.books = data.bestBooks.rows;
    this.count = data.bestBooks.count;
  }
}
