import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaborantinPageComponent } from './laborantin-page/laborantin-page.component';

const routes: Routes = [
  { path: '', component: LaborantinPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborantinRoutingModule {}
