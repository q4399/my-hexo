import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterComponent } from './chapter.component';
import {ShareModule} from "../../share/share.module";


@NgModule({
  declarations: [
    ChapterComponent
  ],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    ShareModule
  ]
})
export class ChapterModule { }
