import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadRoutingModule } from './read-routing.module';
import { ReadComponent } from './read.component';
import {ShareModule} from "../../share/share.module";

//阅读正文模块
@NgModule({
  declarations: [
    ReadComponent
  ],
  imports: [
    CommonModule,
    ReadRoutingModule,
    ShareModule
  ]
})
export class ReadModule { }
