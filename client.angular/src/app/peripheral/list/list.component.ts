/*
 * @author		  Antonio Membrides Espinosa
 * @email    	  tonykssa@gmail.com
 * @date		    07/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
import { PeripheralService } from './../service/peripheral.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PeripheralModel } from '../model/peripheral-model';
import { MessageService } from 'src/app/home/component/message/message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pid: string;
  list: Observable<any[]>;

  constructor(
      private router: Router, 
      private activatedRoute: ActivatedRoute, 
      private srvPeripheral:PeripheralService,
      private srvMessage: MessageService
    ) { }

  reloadData() {
    this.srvPeripheral.list(this.pid).subscribe(res => {
        console.log(res);
        this.list = res.data;
        if(!res.data['status']){
          this.srvMessage.error(res.data['message']);
        }
    });
  }

  getUrl(){
    return '/gateway/'+ this.pid + '/peripheral/';
  }

  ngOnInit() {
    this.pid = this.activatedRoute.snapshot.params.pid;
    this.reloadData();
  }

  onDetails(item: PeripheralModel) {
    this.router.navigate([this.getUrl() + 'details', item.uid]);
  }

  onEdit(item: PeripheralModel) {
    this.router.navigate([this.getUrl(), item.uid]);
  }

  onAdd(){
    this.router.navigate([this.getUrl(), '-1']);
  }

  goback(){
    this.router.navigate(['/gateway/'+ this.pid ]);
  }

  onDelete(item: PeripheralModel) {
    this.srvPeripheral.delete(this.pid, item.uid)
    .subscribe(
      data => {
        if(!(data instanceof Object))
          data = JSON.parse(data);

        console.log(data);

        if(!data['status']){
          this.srvMessage.error(data['message']);
        }else{
          this.srvMessage.success(data['message'] + ': the item was deleted');
          this.reloadData();
        }
      },
      error => this.srvMessage.error(error.message)
    );
  }
}
