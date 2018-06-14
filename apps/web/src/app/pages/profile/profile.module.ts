import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

import { ProfileCoreModule } from '@bookapp-angular/profile-core';

import { components } from './components';
import { containers } from './containers';
import { routes } from './profile.routes';
import { FileSelectorModule } from '@bookapp-angular/ui';
import { FileSelectorComponent } from '@bookapp-angular/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ProfileCoreModule.forRoot(),
    FileSelectorModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [...containers, ...components],
  entryComponents: [FileSelectorComponent]
})
export class ProfileModule {}
