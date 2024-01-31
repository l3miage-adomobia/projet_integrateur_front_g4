import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ModelApi from './model_api';
import { Festival,OffreCovoiturage } from './model_api';



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

  getFestivals(partOfFestName:string, date : string, nomCommuneFest:string, sousdomaine:string,nomCommuneArr:string, page : number): Observable<ModelApi.Festival[]> {
    let params = new HttpParams()
      .set('partOfFestName', partOfFestName)
      .set('date', date) 
      .set('nomCommuneFest', nomCommuneFest)
      .set('sousdomaine', sousdomaine)
      .set('nomCommuneArr', nomCommuneArr)
      .set('page', String(page)); // Convert page number to string

    // Options de la requête avec les paramètres
    let options = { params: params };

    return this.http.get<Festival[]>(this.api_Url+'festivals/filtres', options);
  }

  getCovoiturages(festivalId : number): Observable<ModelApi.OffreCovoiturage[]> {
    return this.http.get<ModelApi.OffreCovoiturage[]>(this.api_Url+'covoiturages/festival/'+String(festivalId));
  }

  getFestivalsByName(fName : string): Observable<ModelApi.Festival[]> {
    return this.http.get<ModelApi.Festival[]>(this.api_Url+'festivals/filtre/nom/'+fName);
  }

}
