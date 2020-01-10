import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

  @ViewChild('FrmMn', { static: false }) FrmMn: NgForm; 
  constructor(
      private router: Router, 
      private activatedRoute: ActivatedRoute, 
      private srvGateway: GatewayService,
      private formBuilder: FormBuilder
    ) {
      this.model = new GatewayModel();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;

    if(this.id !== '.'){
      this.srvGateway.select(this.id).subscribe(res => {
        this.model = res.data;
      });
    }
  }

  isFieldValid(field: string) {
    return !this.FrmMn.form.get(field).valid && this.FrmMn.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.FrmMn.form);
    if (this.FrmMn.form.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.FrmMn.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onReset(){
    this.FrmMn.form.reset();
  }




  reloadData() {
    this.srvGateway.list().subscribe(res => {
        this.model = res.data;
        this.model.devices = !this.model.devices ? [] : this.model.devices;
    });
  }

  onSave(){
   /* console.log(this.FrmGw.form.valid);
    console.log(this.model);

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
    this.FrmGw.form.markAllAsTouched();*/
  }

  onPhDetails(target){
    this.router.navigate(['/gateway/'+target.sn+"/peripheral"]);
  }

  goback (target){
    this.router.navigate(['/gateway/']);
  }
}
