import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadinformationRoutingModule } from './readinformation-routing.module';
import { ReadinformationComponent } from './readinformation.component';
import {ShareModule} from "../../share/share.module";


//阅读信息模块
@NgModule({
  declarations: [
    ReadinformationComponent
  ],
  imports: [
    CommonModule,
    ReadinformationRoutingModule,
    ShareModule
  ]
})
export class ReadinformationModule { }
