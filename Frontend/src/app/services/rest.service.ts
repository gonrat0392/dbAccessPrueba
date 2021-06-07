import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public endPoint: string = 'http://localhost:3000/api/v1/'

  constructor(
    private http: HttpClient
  ) { }

  public get(url:string){
    return this.http.get(this.endPoint + url);
  }

  public getId(url:string, body:any){
    return this.http.get(this.endPoint + url, body);
  }

  public post(url:string, body:any){
    return this.http.post(this.endPoint + url, body);
  }

  public put(url:string, body:any){
    return this.http.put(this.endPoint + url, body);
  }

  public delete(url:string, body:any){
    return this.http.delete(this.endPoint + url, body);
  }

}
