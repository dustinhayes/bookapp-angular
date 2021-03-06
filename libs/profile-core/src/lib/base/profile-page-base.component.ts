import { OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { User, UserSelfResponse } from '@bookapp-angular/auth-core';
import { BaseComponent, FeedbackPlatformService } from '@bookapp-angular/core';
import { ME_QUERY } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import { ProfileForm } from '../models';
import { ProfileService } from '../services';

export abstract class ProfilePageBaseComponent extends BaseComponent
  implements OnInit {
  user$: Observable<User>;
  error: any;
  isLoading = false;

  protected abstract apollo: Apollo;
  protected abstract profileService: ProfileService;
  protected abstract feedbackService: FeedbackPlatformService;

  ngOnInit() {
    this.user$ = this.apollo
      .watchQuery<UserSelfResponse>({
        query: ME_QUERY
      })
      .valueChanges.pipe(map(({ data }) => data.me), takeUntil(this.destroy$));
  }

  updateProfile(event: ProfileForm) {
    this.isLoading = true;

    return this.profileService
      .update(event.id, event.user)
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data, errors }) => {
        if (data) {
          this.feedbackService.success('Profile updated!');
        }

        if (errors) {
          this.error = errors[errors.length - 1];
        }
      });
  }
}
