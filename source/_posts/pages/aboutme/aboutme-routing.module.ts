import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {AboutmeComponent} from "./aboutme.component";

const routes: Routes = [
  {
    path: 'aboutme',
    component: AboutmeComponent,
    data: {
      token: 'null'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutmeRoutingModule { }
