import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReadinformationComponent} from "./readinformation.component";

const routes: Routes = [
  {
    path:'readinformation/:id',
    component:ReadinformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadinformationRoutingModule { }
