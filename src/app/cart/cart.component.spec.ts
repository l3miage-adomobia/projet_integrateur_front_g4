/**
 * Unit tests for CartComponent.
 *
 * This test suite ensures the CartComponent behaves as expected under various scenarios,
 * focusing on its ability to manage and display reservations, interact with services,
 * and handle user actions like deleting or updating reservations.
 */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CartComponent} from './cart.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReservationService} from "./service/reservation.service";
import {UserService} from "../authentification/service/user.service";
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {DatePipe} from '@angular/common';
import {Reservation} from './model/reservation';

// Mock services to simulate real interactions
class MockReservationService {
    getReservations = jasmine.createSpy().and.returnValue(of([]));
    deleteReservation = jasmine.createSpy();
}

class MockUserService {
    getUser = jasmine.createSpy().and.returnValue(of({}));
}

class MockMatDialog {
    open = jasmine.createSpy().and.returnValue({afterClosed: () => of(true)});
}

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let mockReservationService: MockReservationService;
    let mockUserService: MockUserService;
    let mockMatDialog: MockMatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, MatTableModule, MatPaginatorModule, NoopAnimationsModule],
            declarations: [CartComponent],
            providers: [
                {provide: ReservationService, useClass: MockReservationService},
                {provide: UserService, useClass: MockUserService},
                {provide: MatDialog, useClass: MockMatDialog},
                DatePipe
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        mockMatDialog = TestBed.inject(MatDialog) as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load reservations on initialization', () => {
        // Verify reservations are fetched on component initialization
        expect(mockReservationService.getReservations).toHaveBeenCalled();
    });

    it('should handle deleteReservation correctly', () => {
        // Simulate deleting a reservation and verify the service method is called
        const reservationId = 123;
        component.deleteReservation(reservationId);
        expect(mockReservationService.deleteReservation).toHaveBeenCalledWith(reservationId);
    });

    it('should calculate total price correctly', () => {
        // Mock reservations data conforming to the Reservation interface
        const mockReservations: Reservation[] = [
            {
                id: 1,
                nomFestival: 'Festival A',
                dateDebutFestival: '2023-01-01',
                dateFinFestival: '2023-01-03',
                lieuPrincipaleFestival: 'Location A',
                domaineFestival: 'Music',
                sousDomaineFestival: 'Rock',
                nomCovoitureur: 'John Doe',
                modeleVehicule: 'Car Model A',
                lieuEtapeCovoiturage: 'Stage A',
                heureCovoiturage: '10:00',
                dateCovoiturage: '2023-01-02',
                nombrePlacesChoisies: 2,
                tarifCovoiturage: 10,
                tarifFestival: 50
            },
            {
                id: 2,
                nomFestival: 'Festival B',
                dateDebutFestival: '2023-02-01',
                dateFinFestival: '2023-02-03',
                lieuPrincipaleFestival: 'Location B',
                domaineFestival: 'Art',
                sousDomaineFestival: 'Contemporary',
                nomCovoitureur: 'Jane Doe',
                modeleVehicule: 'Car Model B',
                lieuEtapeCovoiturage: 'Stage B',
                heureCovoiturage: '12:00',
                dateCovoiturage: '2023-02-02',
                nombrePlacesChoisies: 1,
                tarifCovoiturage: 15,
                tarifFestival: 60
            }
        ];

        // Initialize the MatTableDataSource with the mock reservations
        component.reservations = new MatTableDataSource<Reservation>(mockReservations);

        // Trigger change detection to update the view and paginator
        fixture.detectChanges();

        // Calculate the expected total price based on the mock data
        const expectedTotalPrice = mockReservations.reduce((total, reservation) => {
            return total + reservation.nombrePlacesChoisies * (reservation.tarifCovoiturage + reservation.tarifFestival);
        }, 0);

        // Assert that the calculated total price matches the expected value
        expect(component.calculateTotalPrice()).toEqual(expectedTotalPrice);
    });


    it('should open confirmation dialog for reservation deletion', () => {
        const reservationId = 123;
        component.openConfirmationDialog(reservationId, 'delete');
        expect(mockMatDialog.open).toHaveBeenCalled(); // Verify dialog open method is called
    });
});