import { PeripheralService } from './../service/peripheral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeripheralModel } from './../model/peripheral-model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  model: PeripheralModel;
  id:Number;
  pid: string;

  @ViewChild('FrmGw', { static: false }) FrmGw: NgForm;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private srvPeripheral: PeripheralService) {
    this.model = new PeripheralModel();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.pid = this.activatedRoute.snapshot.params.pid;

    if(this.id !== -1){
      this.srvPeripheral.select(this.pid, this.id).subscribe(res => {
        this.model = res.data;
        
    console.log( res);
      });
    }
  }

  reloadData() {
    this.srvPeripheral.list(this.pid).subscribe(res => {
        this.model = res.data;
    });
  }

  onSave(){
    if(this.FrmGw.form.valid){
      if(this.id !== -1){
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
    this.FrmGw.form.markAllAsTouched();
  }
}
