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

  getCovoiturages(festivalId : number): Observable<ModelApi.Etape[]> {
    return this.http.get<ModelApi.Etape[]>(this.api_Url+'covoiturages/festival/'+String(festivalId));
  }

  getFestivalsByName(fName : string): Observable<ModelApi.Festival[]> {
    return this.http.get<ModelApi.Festival[]>(this.api_Url+'festivals/filtre/nom/'+fName);
  }

  addReservationPanier(mailUtilisateur : string, idEtape : number, nbPlacesReserve  : number): Observable<any> {
    let params = new HttpParams()
      .set('mailUtilisateur', mailUtilisateur)
      .set('idEtape', idEtape) 
      .set('nbPlacesReserve', nbPlacesReserve )


    // Options de la requête avec les paramètres
    let options = { params: params };
    console.log("oui je suis dans addresa mail :  " + mailUtilisateur+ " idEtape :"+idEtape+" nbplaces :"+nbPlacesReserve)
     this.http.post<any>(this.api_Url+'reservations/ajouter/mailFestivalier/'+mailUtilisateur+
    '/idEtape/'+idEtape+'/nbPlaces/'+nbPlacesReserve,options).subscribe({
      next: (data) => {
        console.log('Data:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
    return this.http.post<any>(this.api_Url+'reservations/ajouter/mailFestivalier/'+mailUtilisateur+idEtape+nbPlacesReserve,options); 
  }

  ajouterResaAuPanier(mailUtilisateur: string, idEtape: number, nbPlacesReserve: number): Observable<ModelApi.Resa> {
    const url = `${this.api_Url}reservations/ajouter/mailFestivalier/${mailUtilisateur}/idEtape/${idEtape}/nbPlaces/${nbPlacesReserve}`;
    console.log("Appel API pour ajouter une réservation: ", url);
    return this.http.post<ModelApi.Resa>(url, {});
  }

}
