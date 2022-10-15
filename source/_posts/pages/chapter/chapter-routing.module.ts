import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChapterComponent} from "./chapter.component";

const routes: Routes = [
  {
    path:'chapter/:id',
    component:ChapterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChapterRoutingModule { }
