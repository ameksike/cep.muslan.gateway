import { PeripheralService } from './../service/peripheral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeripheralModel } from './../model/peripheral-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      private formBuilder: FormBuilder
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
      });
    }
  }

  reloadData() {
    this.srvPeripheral.list(this.pid).subscribe(res => {
        this.model = res.data;
    });
  }

  onSave(){
    if(this.FrmMn.form.valid){
      if(this.id != -1){
          this.srvPeripheral.update(this.pid, this.model.uid, this.model).subscribe(
              data => {
                console.log(data);
              },
              error => console.log(error)
          );
      }else{
        this.srvPeripheral.insert(this.pid, this.model).subscribe(
            data => {
              console.log(data);
            },
            error => console.log(error)
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
