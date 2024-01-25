import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  // Ajoutez ici les variables et fonctions nécessaires
  searchFestival(name: string) {
    // Logique pour chercher un festival avec le nom donné
  }

  goToSearchFest() {
    this.router.navigate(['search-fest']);
  }
}