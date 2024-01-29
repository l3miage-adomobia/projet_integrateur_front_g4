import { Component } from '@angular/core';
import { OffreCovoiturage } from '../model_api';

@Component({
  selector: 'app-search-covoit',
  templateUrl: './search-covoit.component.html',
  styleUrls: ['./search-covoit.component.css']
})
export class SearchCovoitComponent {

  private clickCounts = new Map<OffreCovoiturage, number>();
  page: number = 1;

  offresCovoiturage: OffreCovoiturage[] = [
    {
      idOffreDeCovoiturage: 1,
      nbPlacesOffertes: 3,
      modeleVoiture: "Toyota Prius",
      etapes: [
        { depart: "Paris", villeArrivee: "Lyon", heureDepart: "09:00", tarif: 15 },
        { depart: "Lyon", villeArrivee: "Marseille", heureDepart: "12:00", tarif: 10}
      ],
      covoitureur: {
        nom: "Jean Dupont",
        age: 35,
        email: "jean.dupont@example.com"
      }
    },
    {
      idOffreDeCovoiturage: 2,
      nbPlacesOffertes: 2,
      modeleVoiture: "Volkswagen Golf",
      etapes: [
        { depart: "Lyon", villeArrivee: "Nice", heureDepart: "08:30", tarif: 12 },
        { depart: "Nice", villeArrivee: "Cannes", heureDepart: "11:00", tarif: 8}
      ],
      covoitureur: {
        nom: "Alice Martin",
        age: 28,
        email: "alice.martin@example.com"
      }
    },
    {
      idOffreDeCovoiturage: 3,
      nbPlacesOffertes: 4,
      modeleVoiture: "Tesla Model S",
      etapes: [
        { depart: "Marseille", villeArrivee: "Nice", heureDepart: "10:00", tarif: 10},
        { depart: "Nice", villeArrivee: "Monaco", heureDepart: "12:30", tarif: 5}
      ],
      covoitureur: {
        nom: "Thomas Lefevre",
        age: 40,
        email: "thomas.lefevre@example.com"
      }
    }
  ];
  
 

  ngOnInit(): void {
    /*
    this.appService.getFestivals().subscribe({
      next: (data: Festival[]) => {
        this.festivals = data;
      },
      error: (error) => {
        console.error('Error fetching Festivals:', error);
      }});*/

    // Initialize click counts for each festival
    this.offresCovoiturage.forEach(covoiturage => {
      this.clickCounts.set(covoiturage, 0);
    });
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

  goToPanier() {
    this.router.navigate(['search-covoit']);
  }
}
