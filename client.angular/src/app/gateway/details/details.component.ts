import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GatewayModel } from './../model/gateway.model';
import { GatewayService } from './../service/gateway.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  model: GatewayModel;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private srvGateway: GatewayService) { 
    this.model = new GatewayModel();
  }

  reloadData(id) {
    this.srvGateway.select(id).subscribe(res => {
        this.model = res.data;
        this.model.devices = !this.model.devices ? [] : this.model.devices;
    });
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.reloadData(id) ;
  }

  onPeripheral(target){
    let uri = '/gateway/'+target.sn+'/peripheral';
    this.router.navigate([uri]);
  }
  
}
