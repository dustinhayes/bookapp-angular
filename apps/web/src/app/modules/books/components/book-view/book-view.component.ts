import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { Book } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookViewComponent {
  @Input() book: Book;
  @Input()
  set user(value: User) {
    if (value) {
      this._isAdmin = value.roles.includes('admin');
    }
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  private _isAdmin: boolean;
}