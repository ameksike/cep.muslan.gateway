import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GatewayModel } from './../model/gateway.model';
import { GatewayService } from './../service/gateway.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {
  
  model: GatewayModel;
  id: string;

  @ViewChild('FrmGw', { static: false }) FrmGw: NgForm;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private srvGateway: GatewayService) {
    this.model = new GatewayModel();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id !== '.'){
      this.srvGateway.select(this.id).subscribe(res => {
        this.model = res.data;
        this.model.devices = !this.model.devices ? [] : this.model.devices;
      });
    }
  }

  reloadData() {
    this.srvGateway.list().subscribe(res => {
        this.model = res.data;
    });
  }

  onSave(){
    if(this.FrmGw.form.valid){
      if(this.id !== '.'){
          this.srvGateway.update(this.model.sn, this.model).subscribe(
              data => {
                console.log(data);
              },
              error => console.log(error)
          );
      }else{
        this.srvGateway.insert(this.model).subscribe(
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

  onPhDetails(target){
    this.router.navigate(['/gateway/'+target.sn+"/peripheral"]);
  }
}
