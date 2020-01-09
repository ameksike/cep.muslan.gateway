import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeripheralRoutingModule } from './peripheral-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ListComponent, EditComponent, DetailsComponent],
  imports: [
    CommonModule,
    PeripheralRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PeripheralModule { }
