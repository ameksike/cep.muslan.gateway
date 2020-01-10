import { PeripheralModel } from './../model/peripheral-model';
import { Router, ActivatedRoute } from '@angular/router';
import { PeripheralService } from './../service/peripheral.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  model: PeripheralModel;
  pid: string;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private srvPeripheral: PeripheralService) { 
    this.model = new PeripheralModel();
  }

  reloadData(id) {
    this.srvPeripheral.select(this.pid, id).subscribe(res => {
        this.model = res.data;
    });
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
