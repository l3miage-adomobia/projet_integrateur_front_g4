import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterFestService } from '../services/filter-fest/filter-fest.service'; 
import { Festival } from '../model_api';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  searchForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private filterService: FilterFestService
  ) {
    this.searchForm = this.formBuilder.group({
      nomFestival: [''],
      nomSousDomaine: [''],
      date: [''],
      lieu: [''],
      depart: [''],
    });
  }


  goToSearchFest() {
    this.filterService.setFilter(this.searchForm.value);
    console.log(this.searchForm.value);
    this.router.navigate(['search-fest']);
  }
}