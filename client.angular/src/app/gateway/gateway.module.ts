import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ListComponent, EditComponent, DetailsComponent],
  imports: [
    CommonModule,
    GatewayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  //exports:[FormsModule]
})
export class GatewayModule { }
