import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookInfoComponent} from "./book-info.component";

const routes: Routes = [
  {
    path:'bookInfo/:id',
    component:BookInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookInfoRoutingModule { }
