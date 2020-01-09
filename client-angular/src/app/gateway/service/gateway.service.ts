import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as data from '../../../data/config.json';

@Injectable({
  providedIn: 'root'
})

export class GatewayService {

  private port: Number;
  private host: string;
  private path: string;
  private protocol: string;

  constructor(private http: HttpClient) { 
    this.protocol = data['default']['protocol'] || "http";
    this.host = data['default']['host'] || "localhost";
    this.port = data['default']['port'] || 3003;
    this.path = "/gateway";
  }

  getUrl(){
    return this.protocol + "://" + this.host + ":" + this.port + this.path;
  }

  select(id: string): Observable<any> {
    return this.http.get(`${this.getUrl()}/${id}`);
  }

  list(): Observable<any> {
    return this.http.get(this.getUrl());
  }

  insert(item: Object): Observable<any> {
    return this.http.post(this.getUrl(), item);
  }

  update(id: string, value: any): Observable<any> {
    return this.http.put(`${this.getUrl()}/${id}`, value);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.getUrl()}/${id}`, { responseType: 'text' });
  }
}
