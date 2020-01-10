/*
 * @author		  Antonio Membrides Espinosa
 * @email    	  tonykssa@gmail.com
 * @date		    07/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GatewayModel } from './../model/gateway.model';
import { GatewayService } from './../service/gateway.service';
import { MessageService } from 'src/app/home/component/message/message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  model: GatewayModel;
  countEl:  Number;   
  constructor(
      private activatedRoute: ActivatedRoute, 
      private router: Router, 
      private srvGateway: GatewayService,
      private srvMessage: MessageService
    ) { 
    this.model = new GatewayModel();
    this.countEl = 0;
  }

  reloadData(id) {
    this.srvGateway.select(id).subscribe(res => {
        this.model = res.data;
        this.model.devices = !this.model.devices ? [] : this.model.devices;
        this.countEl = this.model instanceof Array ? this.model.devices.length : 0;
        if(!res.data['status']){
          this.srvMessage.error(res.data['message']);
      }
    });
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.reloadData(id) ;
  }

  goback (target){
    this.router.navigate(['/gateway/']);
  }

  onPeripheral(target){
    let uri = '/gateway/'+target.sn+'/peripheral';
    this.router.navigate([uri]);
  }
  
}
