import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeripheralModel } from '../model/peripheral-model';
import * as data from '../../../data/config.json';

@Injectable({
  providedIn: 'root'
})
export class PeripheralService {
  private port: Number;
  private host: string;
  private path: string;
  private protocol: string;

  constructor(private http: HttpClient) { 
    this.protocol = data['default']['protocol'] || "http";
    this.host = data['default']['host'] || "localhost";
    this.port = data['default']['port'] || 3003;
  }

  getUrl(pid:string){
    return this.protocol + "://" + this.host + ":" + this.port 
            + "/gateway/" + pid + "/peripheral";
  }

  select(pid: string, id:Number): Observable<any> {
    return this.http.get(`${this.getUrl(pid)}/${id}`);
  }

  list(pid: string): Observable<any> {
    return this.http.get(this.getUrl(pid));
  }

  insert(pid: string, item: PeripheralModel): Observable<any> {
    return this.http.post(this.getUrl(pid), item);
  }

  update(pid: string, id: Number, value: PeripheralModel): Observable<any> {
    return this.http.put(`${this.getUrl(pid)}/${id}`, value);
  }

  delete(pid: string, id: Number): Observable<any> {
    return this.http.delete(`${this.getUrl(pid)}/${id}`, { responseType: 'text' });
  }
}
