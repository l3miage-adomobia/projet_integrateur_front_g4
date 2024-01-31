import { Component } from '@angular/core';
import { Etape, OffreCovoiturage } from '../model_api';
import { ActivatedRoute, Router } from "@angular/router";
import { FestivalService } from '../services/fest-covoit/festival.service';
import { AppService } from '../app.service';
import { UserService } from '../authentification/service/user.service';
import { FesticarUser } from '../authentification/service/FesticarUser';



@Component({
    selector: 'app-search-covoit',
    templateUrl: './search-covoit.component.html',
    styleUrls: ['./search-covoit.component.css']
})
export class SearchCovoitComponent {

    page: number = 1;
    offresCovoiturage: OffreCovoiturage[] = [];
    private clickCounts = new Map<OffreCovoiturage, number>();
    public currentUser: FesticarUser = { name: '', token: '', photoURL: '', mail: '' };

    constructor(private router: Router,
        private route: ActivatedRoute,
        private festivalService: FestivalService,
        private appService: AppService,
        private us: UserService
    ) { }

    ngOnInit(): void {

        const id = this.route.snapshot.paramMap.get('id');
        if (id !== null) {
            this.appService.getCovoiturages(parseInt(id, 10)).subscribe({
                next: (data: OffreCovoiturage[]) => {
                    this.offresCovoiturage = data;
                },
                error: (error) => {
                    console.error('Error fetching Festivals:', error);
                }
            });
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

    onCovoiturageClick(covoiturage: OffreCovoiturage, increment: boolean, event: MouseEvent): void {
        event.stopPropagation(); // Prevent click from bubbling to the card element
        const currentCount = this.clickCounts.get(covoiturage) || 0;
        this.clickCounts.set(covoiturage, increment ? currentCount + 1 : Math.max(currentCount - 1, 0));
    }

    getClickCount(covoiturage: OffreCovoiturage): number {
        return this.clickCounts.get(covoiturage) || 0;
    }

    onPageChange(increment: boolean): void {
        this.page += increment ? 1 : -1;
        //this.getFestivalsPData(this.page);
    }

    ajoutPanier(mail: string, idEtape: number, nbplaces: number) {
        console.log("ajout panier"+mail+" " + idEtape + " " + nbplaces);
        //this.router.navigate(['cart']);
    }
}
