/*
 * @author		  Antonio Membrides Espinosa
 * @email    	  tonykssa@gmail.com
 * @date		    07/01/2020
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
import { PeripheralService } from './../service/peripheral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeripheralModel } from './../model/peripheral-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/home/component/message/message.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  model: PeripheralModel;
  id:Number;
  pid: string; 


  registerForm: FormGroup;
  submitted = false;

  @ViewChild('FrmMn', { static: false }) FrmMn: NgForm; 
  constructor(
      private router: Router, 
      private activatedRoute: ActivatedRoute, 
      private srvPeripheral: PeripheralService,
      private formBuilder: FormBuilder,
      private srvMessage: MessageService
    ) {
    this.model = new PeripheralModel();
    this.model.status = false;
  }

  isFieldValid(field: string) {
    return !this.FrmMn.form.get(field).valid && this.FrmMn.form.get(field).touched;
  }

  onReset() {
    this.submitted = false;
    this.FrmMn.form.reset();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.pid = this.activatedRoute.snapshot.params.pid;

    if(this.id != -1){
      this.srvPeripheral.select(this.pid, this.id).subscribe(res => {
        this.model = res.data;
        this.id = res.data.uid;
        if(!res.data['status']){
          this.srvMessage.error(res.data['message']);
        }
      });
    }
  }

  reloadData() {
    this.srvPeripheral.list(this.pid).subscribe(res => {
        this.model = res.data;
        this.id = res.data.uid;
        if(!res.data['status']){
          this.srvMessage.error(res.data['message']);
        }
    },
    error => this.srvMessage.error(error.message));
  }

  onSave(){
    if(this.FrmMn.form.valid){
      if(this.id != -1){
          this.srvPeripheral.update(this.pid, this.id, this.model).subscribe(
              data => {
                console.log(data);
                if(!data['status']){
                  this.srvMessage.error(data['message']);
                }else{
                  this.srvMessage.success(data['message'] + ': the item was updated');
                }
              },
              error => this.srvMessage.error(error.message)
          );
      }else{
        this.srvPeripheral.insert(this.pid, this.model).subscribe(
            data => {
              console.log(data);
              if(!data['status']){
                this.srvMessage.error(data['message']);
              }else{
                this.srvMessage.success(data['message'] + ': the item was inserted');
              }
            },
            error => this.srvMessage.error(error.message)
        );
      }
    }else{

    }
    this.FrmMn.form.markAllAsTouched();
  }

  getUrl(){
    return '/gateway/'+ this.pid + '/peripheral/';
  }

  goback(){
    this.router.navigate([this.getUrl()]);
  }

}
