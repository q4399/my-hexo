import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";
import {NoSanitizePipe} from "../utils/nosanitizerpipe";
import {HourPipe} from "../utils/hour.pipe";



@NgModule({
  declarations: [NoSanitizePipe,HourPipe],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdMobileModule,

  ],
  exports: [
    FormsModule,
    NgZorroAntdMobileModule,
    NoSanitizePipe,
    HourPipe,
  ]
})
export class ShareModule { }
