import {Component} from '@angular/core';
import {Etape} from '../model_api';
import {ActivatedRoute, Router} from "@angular/router";
import {FestivalService} from '../services/fest-covoit/festival.service';
import {AppService} from '../app.service';
import {UserService} from '../authentification/service/user.service';
import {FesticarUser} from '../authentification/service/FesticarUser';

@Component({
    selector: 'app-search-covoit',
    templateUrl: './search-covoit.component.html',
    styleUrls: ['./search-covoit.component.css']
})
export class SearchCovoitComponent {

    page: number = 1;
    offresCovoiturage: Etape[] = [];
    testChangePage: Etape[] = [];
    public currentUser: FesticarUser = {name: '', token: '', photoURL: '', mail: ''};
    isNextPage: boolean = false;
    idParam: string | null = this.route.snapshot.paramMap.get('id');
    id = this.idParam !== null ? parseInt(this.idParam, 10) : -1;
    nomFestival = this.route.snapshot.paramMap.get('nomFestival');
    stringNbPass = this.route.snapshot.paramMap.get('nbPass');
    testPass = this.stringNbPass !== null ? parseInt(this.stringNbPass, 10) : 0;
    nbPass = this.stringNbPass !== null ? parseInt(this.stringNbPass, 10) : 0;
    private clickCounts = new Map<Etape, number>();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private festivalService: FestivalService,
                private appService: AppService,
                private us: UserService
    ) {
    }

    ngOnInit(): void {
        if (this.id !== null) {
            this.getCovoituragesPData(this.id);
        } else {
            console.error('Error: ID is null');
        }


        // Initialize click counts for each festival
        this.offresCovoiturage.forEach(covoiturage => {
            this.clickCounts.set(covoiturage, 0);
        });

        this.us.getUser().subscribe(user => {
            this.currentUser = user;
        });
        console.log("mail :" + this.currentUser.mail)
    }


    onCovoiturageClick(covoiturage: Etape, increment: boolean, event: MouseEvent): void {
        event.stopPropagation(); // Prevent click from bubbling to the card element
        let totalClicks = Array.from(this.clickCounts.values()).reduce((a, b) => a + b, 0);
        if (increment && this.nbPass >= 1) {
            this.nbPass--;
            const currentCount = this.clickCounts.get(covoiturage) || 0;
            this.clickCounts.set(covoiturage, currentCount + 1);
        } else if (!increment && totalClicks <= this.testPass) {
            this.nbPass++;
            const currentCount = this.clickCounts.get(covoiturage) || 0;
            this.clickCounts.set(covoiturage, Math.max(currentCount - 1, 0));
        }
    }

    getClickCount(covoiturage: Etape): number {
        return this.clickCounts.get(covoiturage) || 0;
    }

    onPageChange(increment: boolean): void {
        this.page += increment ? 1 : -1;
        //this.getFestivalsPData(this.page);
    }

    getCovoituragesPData(id: number): void {
        // Appel de getFestivals avec les paramètres de filtre

        // Premier appel HTTP
        this.appService.getCovoiturages(this.id).subscribe({
            next: (offresCovoiturage: Etape[]) => {
                this.offresCovoiturage = offresCovoiturage;

                // Deuxième appel HTTP
                this.appService.getCovoiturages(this.id).subscribe({
                    next: (testChangePage: Etape[]) => {
                        this.testChangePage = testChangePage;

                        // Vérification de la page suivante
                        if (this.testChangePage.length == 0) {
                            this.isNextPage = false;
                        } else {
                            this.isNextPage = true;
                        }
                    },
                    error: (error) => {
                        console.error('Error fetching festivals:', error);
                    }
                });
            },
            error: (error) => {
                console.error('Error fetching festivals:', error);
            }
        });
    }

    refreshFestivals(): void {
        this.page = 1;
        this.getCovoituragesPData(this.id);
    }

    ajoutPanier(mail: string, idEtape: number, nbplaces: number) {
        let testmail = 'testtest.com';
        console.log("mail :  " + mail + " idEtape :" + idEtape + " nbplaces :" + nbplaces)
        this.appService.addReservationPanier(mail, idEtape, nbplaces);
        //this.appService.ajouterResaAuPanier(mail, idEtape, nbplaces);
    }
}
