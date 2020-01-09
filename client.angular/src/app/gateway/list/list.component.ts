import { GatewayService } from './../service/gateway.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Observable<any[]>;

  constructor(private router: Router, private srvGateway:GatewayService) { }

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
        this.reloadData();
      },
      error => console.log(error));
  }
}
