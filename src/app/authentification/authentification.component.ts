import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./service/auth.service";

@Component({
    selector: 'app-authentification',
    templateUrl: './authentification.component.html',
    styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {
    loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    })

    email: string = '';

    password: string = '';

    activeTab: string = 'signup';

    constructor(private auth: AuthService) {
    }

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }

    signInWithGoogle() {
        this.auth.googleSignIn();
    }

}
