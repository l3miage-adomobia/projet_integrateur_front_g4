import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Festival } from '../model_api';



@Component({
  selector: 'app-search-fest',
  templateUrl: './search-fest.component.html',
  styleUrls: ['./search-fest.component.css']
})
export class SearchFestComponent implements OnInit {
  festivals: Festival[] = 
  
  [
    { 
      idFestival: 1,
      nomFestival: 'RIO LOCO',
      sousDomaine: 'Mus. trad. et monde',
      dateDebut: new Date('2024-02-11'),
      dateFin: new Date('2024-02-15'), // Exemple de date de fin, à ajuster si nécessaire
      lieuPrincipal: 'Toulouse',
      tarif: 15,
      siteWeb: 'https://www.rioloco.org/',
      nombrePass: 0, // Nombre de pass initialisé à zéro
      covoiturages: [] // Tableau d'offres de covoiturage initialisé comme vide
    },
    { 
      idFestival: 2,
      nomFestival: "L'EST DES DUNES",
      sousDomaine: 'Jazz',
      dateDebut: new Date('2024-02-15'),
      dateFin: new Date('2024-02-19'), // Exemple de date de fin, à ajuster si nécessaire
      lieuPrincipal: 'Frehel',
      tarif: 25,
      siteWeb: 'https://www.lestresdunes.com/',
      nombrePass: 0,
      covoiturages: []
    },
    { 
      idFestival: 3,
      nomFestival: 'Musilac',
      sousDomaine: 'Mus. trad. et monde',
      dateDebut: new Date('2024-04-11'),
      dateFin: new Date('2024-04-15'), // Exemple de date de fin, à ajuster si nécessaire
      lieuPrincipal: 'Grenoble',
      tarif: 12,
      siteWeb: 'https://www.musilac.com/',
      nombrePass: 0,
      covoiturages: []
    }
  ];

  constructor(private appService: AppService) {}

  private clickCounts = new Map<Festival, number>();

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
    this.festivals.forEach(festival => {
      this.clickCounts.set(festival, 0);
    });
  }

  onFestivalClick(festival: Festival, increment: boolean, event: MouseEvent): void {
    event.stopPropagation(); // Prevent click from bubbling to the card element
    const currentCount = this.clickCounts.get(festival) || 0;
    this.clickCounts.set(festival, increment ? currentCount + 1 : Math.max(currentCount - 1, 0));
  }

  getClickCount(festival: Festival): number {
    return this.clickCounts.get(festival) || 0;
  }
}
