import { NgModule } from '@angular/core';

import {ShareModule} from "../share/share.module";
import {MainModule} from "./main/main.module";
import {LoginModule} from "./login/login.module";
import {AboutmeModule} from "./aboutme/aboutme.module";
import {ReadinformationRoutingModule} from "./readinformation/readinformation-routing.module";
import {ReadinformationModule} from "./readinformation/readinformation.module";
import {ChapterModule} from "./chapter/chapter.module";
import { BookInfoComponent } from './book-info/book-info.component';
import {BookInfoModule} from "./book-info/book-info.module";
import {CommonModule} from "@angular/common";
import {ReadModule} from "./read/read.module";
import {AppRoutingModule} from "../app-routing.module";
import {FeedbackModule} from "./feedback/feedback.module";



@NgModule({
  declarations: [
    BookInfoComponent
  ],
    imports: [
        ShareModule,
        MainModule,
        LoginModule,
        AboutmeModule,
        ReadinformationModule,
        FeedbackModule,
        ChapterModule,
        BookInfoModule,
        ReadModule,
        CommonModule,
        AppRoutingModule
    ],
  exports:[
    MainModule,
    LoginModule,
    AboutmeModule,
    ReadinformationModule,
    ChapterModule,
    ReadModule,
    BookInfoModule
  ]
})
export class PagesModule { }
