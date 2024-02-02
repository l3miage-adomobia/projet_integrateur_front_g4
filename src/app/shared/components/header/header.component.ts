import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../authentification/service/user.service";
import {FesticarUser} from "../../../authentification/service/FesticarUser";
import {AuthService} from "../../../authentification/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {ReservationService} from "../../../cart/service/reservation.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public currentUser: FesticarUser = {name: '', token: '', photoURL: '', mail: ''};

    constructor(private us: UserService, private auth: AuthService, private dialog: MatDialog, private rs: ReservationService) {
    }

    confirmLogout(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            panelClass: 'custom-modalbox',
            data: {message: 'Êtes-vous sûr de vouloir vous déconnecter ?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.logout();
            }
        });
    }

    ngOnInit(): void {
        this.us.getUser().subscribe(user => {
            this.currentUser = user;
        });
    }

    logout() {
        this.auth.logout();
    }
}
