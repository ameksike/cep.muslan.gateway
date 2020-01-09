import { PeripheralService } from './../service/peripheral.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PeripheralModel } from '../model/peripheral-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pid: string;
  list: Observable<any[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private srvPeripheral:PeripheralService) { }

  reloadData() {
    this.srvPeripheral.list(this.pid).subscribe(res => {
      console.log(res);

        this.list = res.data;
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

  onDelete(item: PeripheralModel) {
    this.srvPeripheral.delete(this.pid, item.uid)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
  }
}
