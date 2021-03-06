import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

import { BookCommentsBaseComponent } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-comments',
  templateUrl: './book-comments.component.html',
  styleUrls: ['./book-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCommentsComponent extends BookCommentsBaseComponent {
  @ViewChild('list', { read: ElementRef })
  list: ElementRef;

  addComment() {
    this.onCommentAdded.emit(this.text);
    this.text = '';
    setTimeout(() => {
      this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
    }, 200);
  }
}
