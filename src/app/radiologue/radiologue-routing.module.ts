import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadiologuePageComponent } from './radiologue-page/radiologue-page.component';

const routes: Routes = [
  { path: '', component: RadiologuePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadiologueRoutingModule { }
