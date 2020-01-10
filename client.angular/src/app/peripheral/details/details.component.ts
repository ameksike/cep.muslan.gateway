/*
 * @author		  Antonio Membrides Espinosa
 * @email    	  tonykssa@gmail.com
 * @date		    07/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
import { PeripheralModel } from './../model/peripheral-model';
import { Router, ActivatedRoute } from '@angular/router';
import { PeripheralService } from './../service/peripheral.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/home/component/message/message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  model: PeripheralModel;
  pid: string;
  
  constructor(
      private activatedRoute: ActivatedRoute, 
      private router: Router, 
      private srvPeripheral: PeripheralService,
      private srvMessage: MessageService
    ) { 
    this.model = new PeripheralModel();
  }

  reloadData(id) {
    this.srvPeripheral.select(this.pid, id).subscribe(res => {
        this.model = res.data;
        if(!res.data['status']){
          this.srvMessage.error(res.data['message']);
        }
    },
    error => this.srvMessage.error(error.message));
  }

  getUrl(){
    return '/gateway/'+ this.pid + '/peripheral/';
  }

  goback(){
    this.router.navigate([this.getUrl()]);
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.pid = this.activatedRoute.snapshot.params.pid;
    this.reloadData(id) ;
  }
}
