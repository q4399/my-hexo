import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutmeRoutingModule } from './aboutme-routing.module';
import { AboutmeComponent } from './aboutme.component';
import {ShareModule} from "../../share/share.module";


@NgModule({
  declarations: [
    AboutmeComponent
  ],
  imports: [
    CommonModule,
    AboutmeRoutingModule,
    ShareModule
  ],

})
export class AboutmeModule { }
