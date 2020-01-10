/*
 * @author		  Antonio Membrides Espinosa
 * @email    	  tonykssa@gmail.com
 * @date		    07/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
import { GatewayService } from './../service/gateway.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/home/component/message/message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Observable<any[]>;

  constructor(
      private router: Router, 
      private srvGateway:GatewayService,
      private srvMessage: MessageService
  ) { }

  reloadData() {
    this.srvGateway.list().subscribe(res => {
        this.list = res.data;
    });
  }

  ngOnInit() {
    this.reloadData();
  }

  onDetails(item: any) {
    this.router.navigate(['/gateway/details', item.sn]);
  }

  onEdit(item: any) {
    this.router.navigate(['/gateway/', item.sn]);
  }

  onAdd(){
    this.router.navigate(['/gateway/', '.']);
  }

  onDelete(item: any) {
    this.srvGateway.delete(item.sn)
    .subscribe(
      data => {
        console.log(data);
        if(!data['status']){
            this.srvMessage.error(data['message']);
        }
        this.reloadData();
      },
      error => this.srvMessage.error(error.message));
  }
  
  goback (target){
    this.router.navigate(['/gateway/']);
  }
}
