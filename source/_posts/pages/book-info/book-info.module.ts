import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookInfoRoutingModule } from './book-info-routing.module';
import {ShareModule} from "../../share/share.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookInfoRoutingModule,
    ShareModule
  ]
})
export class BookInfoModule { }
