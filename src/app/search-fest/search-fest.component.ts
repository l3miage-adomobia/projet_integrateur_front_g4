import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AppService } from '../app.service';
import { Festival } from '../model_api';
import { FestivalService } from '../services/fest-covoit/festival.service';
import { FilterFestService } from '../services/filter-fest/filter-fest.service'; 

@Component({
  selector: 'app-search-fest',
  templateUrl: './search-fest.component.html',
  styleUrls: ['./search-fest.component.css'],
})
export class SearchFestComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  /*
  nomFestival: string = this.filterService.getFilter().name;
  date: string= this.filterService.getFilter().date; 
  lieu:string = this.filterService.getFilter().lieu;
  nomSousDomaine:string = this.filterService.getFilter().nomSousDomaine;
  depart: string = this.filterService.getFilter().depart;*/
  festivals: Festival[]  = [];
  testChangePage: Festival[] = [];
  displayedColumns: string[] = ['nomFestival', 'nomSousDomaine', 'dateDebut', 'lieuPrincipal', 'tarif'];
  dataSource = new MatTableDataSource<Festival>(this.festivals);
  private clickCounts = new Map<Festival, number>();
  page: number = 1;
  isNextPage: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private festivalService: FestivalService,
    private filterService: FilterFestService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
      nomSousDomaine: [''],
      date: [''],
      lieu: [''],
      depart: [''],
    });

    this.dataSource.sort = this.sort;
    this.getFestivalsPData(this.filterService.getFilter().nomFestival, this.filterService.getFilter().date, this.filterService.getFilter().lieu, this.filterService.getFilter().nomSousDomaine, this.filterService.getFilter().depart,this.page);            // parametre a modifier page a rajouter
    this.festivals.forEach(festival => {
      this.clickCounts.set(festival, 0);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onFestivalClick(festival: Festival, increment: boolean, event: MouseEvent): void {
    event.stopPropagation();
    const currentCount = this.clickCounts.get(festival) || 0;
    this.clickCounts.set(festival, increment ? currentCount + 1 : Math.max(currentCount - 1, 0));
  }

  getClickCount(festival: Festival): number {
    return this.clickCounts.get(festival) || 0;
  }

  onPageChange(increment: boolean): void {
    this.page += increment ? 1 : -1;
      this.getFestivalsPData(
        this.searchForm.controls['name'].valid ? this.searchForm.controls['name'].value : '',
        this.searchForm.controls['date'].valid ? this.searchForm.controls['date'].value : '', 
        this.searchForm.controls['lieu'].valid ? this.searchForm.controls['lieu'].value : '',
        this.searchForm.controls['nomSousDomaine'].valid ? this.searchForm.controls['nomSousDomaine'].value : '',
        this.searchForm.controls['depart'].valid ? this.searchForm.controls['depart'].value : '', 
        this.page);
  }

  goToSearchCovoit(festival: Festival) {
    if (this.clickCounts.get(festival) != 0 && this.clickCounts.get(festival) != undefined){
      console.log(this.clickCounts.get(festival));
      this.festivalService.setSelectedFestival(festival);
    this.router.navigate(['search-covoit/'+festival.nomFestival+'/'+festival.idFestival+'/'+this.clickCounts.get(festival)]);
    }
  }

  getFestivalsPData(nomFestival: string ='', date: string ='', lieu:string ='', nomSousDomaine:string ='', depart: string ='', page : number =1): void {
    // Appel de getFestivals avec les paramètres de filtre
    
    // Premier appel HTTP
    this.appService.getFestivals(nomFestival, date, lieu, nomSousDomaine, depart, page).subscribe({
      next: (festivals: Festival[]) => {
        this.festivals = festivals;
        this.dataSource.data = this.festivals;
  
        // Deuxième appel HTTP
        this.appService.getFestivals(nomFestival, date, lieu, nomSousDomaine, depart, page + 1).subscribe({
          next: (testChangePage: Festival[]) => {
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
    console.log(this.festivals);
    this.getFestivalsPData(this.searchForm.controls['name'].value,
    this.searchForm.controls['date'].value,
    this.searchForm.controls['lieu'].value,
    this.searchForm.controls['nomSousDomaine'].value,
    this.searchForm.controls['depart'].value, 
    this.page);
  }  

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
