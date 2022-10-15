import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRoutingModule} from "./main-routing.module";
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";
import {ShareModule} from "../../share/share.module";
import { IndexComponent } from './index/index.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { MeComponent } from './me/me.component';



@NgModule({
  declarations: [
    MainComponent,
    IndexComponent,
    BookstoreComponent,
    MeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ShareModule,
    NgZorroAntdMobileModule
  ],
})
export class MainModule { }
