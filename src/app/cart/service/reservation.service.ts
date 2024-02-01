import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Reservation} from "../model/reservation";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {


    private api_Url = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) {
    }

    deleteReservation(reservationId: number): void {
        /*
        this.apiService.deleteReservation(reservationId).subscribe(() => {
        const currentReservations = this.reservationsSubject.value;

        const indexToDelete = currentReservations.findIndex(reservation => reservation.id === reservationId);

        if (indexToDelete !== -1) {
            currentReservations.splice(indexToDelete, 1);

            // maj behaviorsubject
            this.reservationsSubject.next([...currentReservations]);
        }
    });
         */
    }

    getReservations(mailFest: string): Observable<Reservation[]> {
        return this.http.get<Reservation[]>('http://localhost:8080/api/paniers/mailFest/' + mailFest);
    }
}
