import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ReservationService} from "./service/reservation.service";
import {Reservation} from "./model/reservation";
import {ConfirmDialogComponent} from "../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements AfterViewInit {
    reservations_test: Reservation[] = [
        {
            id: 1,
            nomFestival: "Festival 1",
            dateDebutFestival: "2024-03-15",
            dateFinFestival: "2024-03-20",
            lieuPrincipaleFestival: "Paris",
            domaineFestival: "Musique",
            sousDomaineFestival: "Rock",
            nomCovoitureur: "John Doe",
            modeleVehicule: "SUV",
            lieuEtapeCovoiturage: "Lyon",
            heureCovoiturage: "15:00",
            dateCovoiturage: "2024-03-18",
            nombrePlacesChoisies: 2,
            tarifCovoiturage: 30,
            tarifFestival: 15

        },
        {
            id: 2,
            nomFestival: "Festival 2",
            dateDebutFestival: "2024-04-10",
            dateFinFestival: "2024-04-15",
            lieuPrincipaleFestival: "Marseille",
            domaineFestival: "Théâtre",
            sousDomaineFestival: "Comédie",
            nomCovoitureur: "Alice Smith",
            modeleVehicule: "Berline",
            lieuEtapeCovoiturage: "Toulouse",
            heureCovoiturage: "14:30",
            dateCovoiturage: "2024-04-12",
            nombrePlacesChoisies: 3,
            tarifCovoiturage: 25,
            tarifFestival: 15

        },
        {
            id: 3,
            nomFestival: "Festival 3",
            dateDebutFestival: "2024-05-20",
            dateFinFestival: "2024-05-25",
            lieuPrincipaleFestival: "Lyon",
            domaineFestival: "Danse",
            sousDomaineFestival: "Classique",
            nomCovoitureur: "Emma Johnson",
            modeleVehicule: "Compacte",
            lieuEtapeCovoiturage: "Grenoble",
            heureCovoiturage: "16:00",
            dateCovoiturage: "2024-05-23",
            nombrePlacesChoisies: 4,
            tarifCovoiturage: 20,
            tarifFestival: 15
        },
        {
            id: 4,
            nomFestival: "Festival 4",
            dateDebutFestival: "2024-06-15",
            dateFinFestival: "2024-06-20",
            lieuPrincipaleFestival: "Bordeaux",
            domaineFestival: "Cinéma",
            sousDomaineFestival: "Drame",
            nomCovoitureur: "Michael Brown",
            modeleVehicule: "SUV",
            lieuEtapeCovoiturage: "Nantes",
            heureCovoiturage: "15:30",
            dateCovoiturage: "2024-06-18",
            nombrePlacesChoisies: 2,
            tarifCovoiturage: 35,
            tarifFestival: 15

        },
        {
            id: 5,
            nomFestival: "Festival 5",
            dateDebutFestival: "2024-07-10",
            dateFinFestival: "2024-07-15",
            lieuPrincipaleFestival: "Toulouse",
            domaineFestival: "Art",
            sousDomaineFestival: "Peinture",
            nomCovoitureur: "Sophia Wilson",
            modeleVehicule: "Berline",
            lieuEtapeCovoiturage: "Montpellier",
            heureCovoiturage: "14:45",
            dateCovoiturage: "2024-07-12",
            nombrePlacesChoisies: 3,
            tarifCovoiturage: 28,
            tarifFestival: 15

        },
    ];
    dataSource = new MatTableDataSource<Reservation>(this.reservations_test);

    reservations: Reservation[] = [];

    @ViewChild(MatPaginator) paginator !: MatPaginator;

    constructor(private rs: ReservationService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.rs.obsReservation.subscribe((reservations) => {
            this.reservations = reservations;
        });

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    updateReservation(idResa: number) {

    }

    deleteReservation(idResa: number) {
        this.rs.deleteReservation(idResa);
        console.log('Réservations après suppression :', this.reservations_test);

    }

    calculateTotalPrice(): number {
        // a faire dans le service
        let totalPrice = 0;
        /* version pour observable
        for (const reservation of this.reservations) {
            totalPrice += reservation.nombrePlacesChoisies * reservation.tarifCovoiturage * 2;
        }

         */
        for (const reservation of this.reservations_test) {
            totalPrice += reservation.nombrePlacesChoisies * (reservation.tarifCovoiturage + reservation.tarifFestival);
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
