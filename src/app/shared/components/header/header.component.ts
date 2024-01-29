import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../authentification/service/user.service";
import {FesticarUser} from "../../../authentification/service/FesticarUser";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    panelOpenState = false
    public currentUser: FesticarUser = {name: '', token: '', photoURL: '', mail: ''};

    constructor(private us: UserService) {
    }

    ngOnInit(): void {
        this.us.getUser().subscribe(user => {
            this.currentUser = user;
        });
    }

}
