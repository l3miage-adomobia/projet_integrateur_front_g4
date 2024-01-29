import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from '@angular/fire/auth'
import {Router} from "@angular/router";
import {UserService} from "./user.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private fireauth: AngularFireAuth, private router: Router, private us: UserService) {
    }


    //sign in with google
    googleSignIn() {
        return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

            this.router.navigate(['/dashboard']);
            const u = this.us.getUser();
            this.us.setName(res.user?.displayName ?? "");
            this.us.setToken(res.user?.uid ?? "");
            this.us.setPhotoURL(res.user?.photoURL ?? "");
            this.us.setMail(res.user?.email ?? "");
        }, err => {
            alert(err.message);
        })
    }

    // login method
    loginWithMailAndPassword(email: string, password: string) {
        this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
            localStorage.setItem('token', 'true');

            if (res.user?.emailVerified == true) {
                this.router.navigate(['dashboard']);
            } else {
                this.router.navigate(['/home']);
            }

        }, err => {
            alert(err.message);
            this.router.navigate(['/home']);
        })
    }

    // register method
    registerWithMailAndPassword(email: string, password: string) {
        this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
            alert('Registration Successful');
            this.sendEmailForVarification(res.user);
            this.router.navigate(['/home']);
        }, err => {
            alert(err.message);
            this.router.navigate(['/home']);
        })
    }

    // sign out
    logout() {
        this.fireauth.signOut().then(() => {
            this.us.setName("");
            this.us.setToken("");
            this.us.setPhotoURL("");
            this.us.setMail("");
            this.router.navigate(['/home']);
        }, err => {
            alert(err.message);
        })
    }

    // forgot password
    forgotPassword(email: string) {
        this.fireauth.sendPasswordResetEmail(email).then(() => {
            this.router.navigate(['/home']);
        }, err => {
            alert('Something went wrong');
        })
    }

    // email varification
    sendEmailForVarification(user: any) {
        console.log(user);
        user.sendEmailVerification().then((res: any) => {
            this.router.navigate(['/home']);
        }, (err: any) => {
            alert('Something went wrong. Not able to send mail to your email.')
        })
    }

}
