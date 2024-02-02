import {Component, ViewChild} from '@angular/core';
import {ReservationService} from "./service/reservation.service";
import {Reservation} from "./model/reservation";
import {ConfirmDialogComponent} from "../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../authentification/service/user.service";
import {FesticarUser} from "../authentification/service/FesticarUser";
import {DatePipe} from "@angular/common";


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {

    public currentUser: FesticarUser = {name: '', token: '', photoURL: '', mail: ''};
    reservations !: MatTableDataSource<Reservation>;

    @ViewChild(MatPaginator) paginator !: MatPaginator;

    constructor(private rs: ReservationService, private dialog: MatDialog, private us: UserService, private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        this.us.getUser().subscribe(user => {
            this.currentUser = user;
        });
        this.loadReservations();

    }

    loadReservations() {
        const mailFest = this.currentUser.mail;

        this.rs.getReservations(this.currentUser.mail.toString()).subscribe(
            (data: any) => {
                const reservationsTransformed = this.transformApiResponseToReservations(data);
                this.reservations = new MatTableDataSource(reservationsTransformed);
                this.reservations.paginator = this.paginator;
            },
            error => {
                console.error('There was an error!', error);
            }
        );
    }

    transformApiResponseToReservations(data: any): Reservation[] {
        return data.reservations.map((reservation: any) => ({
            id: reservation.idReservation,
            nomFestival: reservation.nomFestival,
            dateDebutFestival: this.datePipe.transform(reservation.dateDebut, 'dd/MM/yyyy'),
            dateFinFestival: this.datePipe.transform(reservation.dateFin, 'dd/MM/yyyy'),
            lieuPrincipaleFestival: reservation.lieuPrincipal,
            domaineFestival: reservation.domaine,
            sousDomaineFestival: reservation.sousDomaineFestival,
            nomCovoitureur: reservation.trajet.nomCovoitureur,
            modeleVehicule: reservation.trajet.modeleVoiture,
            lieuEtapeCovoiturage: reservation.trajet.nomCommune,
            heureCovoiturage: this.datePipe.transform(reservation.trajet.dateDepart, 'HH:mm'),
            dateCovoiturage: this.datePipe.transform(reservation.trajet.dateDepart, 'dd-MM-yyyy'),
            nombrePlacesChoisies: reservation.nbPlaces,
            tarifCovoiturage: reservation.trajet.tarif,
            tarifFestival: reservation.tarifFestival,
        }));
    }

    updateReservation(idResa: number) {

    }

    deleteReservation(idResa: number) {
        this.rs.deleteReservation(idResa);
    }

    calculateTotalPrice(): number {
        let totalPrice = 0;

        if (this.reservations.data && this.reservations.data.length) {
            for (const reservation of this.reservations.data) {
                totalPrice += reservation.nombrePlacesChoisies * (reservation.tarifCovoiturage + reservation.tarifFestival);
            }
        }
        return totalPrice;
    }

    openConfirmationDialog(reservationId: number, action: 'delete' | 'update'): void {
        let message = '';

        if (action === 'delete') {
            message = 'Êtes-vous sûr de vouloir supprimer cette réservation ?';
        } else if (action === 'update') {
            message = 'Êtes-vous sûr de vouloir mettre à jour cette réservation ?';
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {message: message},
            panelClass: 'custom-modalbox'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                if (action === 'delete') {
                    this.deleteReservation(reservationId);
                } else if (action === 'update') {
                    this.updateReservation(reservationId);
                }
            } else {
            }
        });
    }

}
