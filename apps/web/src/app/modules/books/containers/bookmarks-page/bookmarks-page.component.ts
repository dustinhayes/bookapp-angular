import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';

import { BookmarksPageBaseComponent } from '../../base/bookmarks-page-base.component';

@Component({
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent extends BookmarksPageBaseComponent {
  title: string;
  protected type: string;

  constructor(protected apollo: Apollo, private route: ActivatedRoute) {
    super();
    this.type = this.route.snapshot.data.type;
    this.title = this.route.snapshot.data.title;
  }
}
