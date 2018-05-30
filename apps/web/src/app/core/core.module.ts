import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoragePlatformService } from '@bookapp-angular/core/services/storage.platform.service';
import { GraphQLModule } from '@bookapp-angular/graphql/graphql.module';
import { NxModule } from '@nrwl/nx';

import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NxModule.forRoot(),
    HttpClientModule,
    GraphQLModule.forRoot()
  ],
  providers: [
    {
      provide: StoragePlatformService,
      useClass: StorageService
    }
  ]
})
export class CoreModule {}
