import {Injectable} from '@angular/core';
import {FesticarUser} from "./FesticarUser";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<FesticarUser>({name: '', token: '', photoURL: '', mail: ''});

    setUser(user: FesticarUser): void {
        this.userSubject.next(user);
    }

    setName(name: string): void {
        const currentUser = this.userSubject.value;
        currentUser.name = name;
        this.userSubject.next(currentUser);
    }

    setToken(token: string): void {
        const currentUser = this.userSubject.value;
        currentUser.token = token;
        this.userSubject.next(currentUser);
    }

    setPhotoURL(photoURL: string): void {
        const currentUser = this.userSubject.value;
        currentUser.photoURL = photoURL;
        this.userSubject.next(currentUser);
    }

    setMail(mail: string) {
        const currentUser = this.userSubject.value;
        currentUser.mail = mail;
        this.userSubject.next(currentUser);
    }

    getUser(): Observable<FesticarUser> {
        return this.userSubject.asObservable();
    }
}
