import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'gateway/:pid/peripheral', component: ListComponent },
  { path: 'gateway/:pid/peripheral/:id', component: EditComponent },
  { path: 'gateway/:pid/peripheral/details/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeripheralRoutingModule { }
