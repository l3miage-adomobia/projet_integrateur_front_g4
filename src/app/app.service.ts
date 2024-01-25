import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ModelApi from './model_api';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  private api_Url = 'http://localhost:8080/api/'; // Use the correct port number

  constructor(private http: HttpClient) {}

  /*
  getDomaines(): Observable<ModelApi.Domaine[]> {
    return this.http.get<ModelApi.Domaine[]>(this.api_Url+'domaines');
  }*/

  getFestivals(): Observable<ModelApi.Festival[]> {
    return this.http.get<ModelApi.Festival[]>(this.api_Url+'festival');
  }


}
