import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ListComponent, EditComponent, DetailsComponent],
  imports: [
    CommonModule,
    GatewayRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  //exports:[FormsModule]
})
export class GatewayModule { }
