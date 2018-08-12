import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { Book, BookRateEvent } from '@bookapp-angular/books-core';

import { Color } from 'color';
import { ListViewLoadOnDemandMode } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { isIOS } from 'platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
  moduleId: module.id,
  selector: 'ba-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent {
  @Input()
  books: ObservableArray<Book>;

  @Output()
  onLoadMore = new EventEmitter<void>();

  @Output()
  onRate = new EventEmitter<BookRateEvent>();

  @ViewChild('listView')
  listViewComponent: RadListViewComponent;

  onItemLoading(args) {
    if (isIOS) {
      const newcolor = new Color('#eeeeee');
      args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
  }

  updateLoadOnDemandMode(hasMoreItems: boolean) {
    if (hasMoreItems) {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.Auto];
    } else {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
    }

    this.listViewComponent.listView.notifyLoadOnDemandFinished();
  }

  scrollToIndex(index: number) {
    this.listViewComponent.listView.scrollToIndex(index);
  }
}
