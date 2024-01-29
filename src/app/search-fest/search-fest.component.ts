import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AppService } from '../app.service';
import { Festival } from '../model_api';

@Component({
  selector: 'app-search-fest',
  templateUrl: './search-fest.component.html',
  styleUrls: ['./search-fest.component.css'],
})
export class SearchFestComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  festivals: Festival[] = [];
  displayedColumns: string[] = ['nomFestival', 'domaine', 'dateDebut', 'lieuPrincipal', 'tarif'];
  dataSource = new MatTableDataSource<Festival>(this.festivals);
  private clickCounts = new Map<Festival, number>();
  page: number = 1;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: [''],
      theme: [''],
      date: [''],
      location: [''],
    });

    this.dataSource.sort = this.sort;
    this.getFestivalsPData(this.page);
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
    this.getFestivalsPData(this.page);
  }

  goToSearchCovoit() {
    this.router.navigate(['search-covoit']);
  }

  getFestivalsPData(page: number): void {
    this.appService.getFestivals(page).subscribe({
      next: (festivals: Festival[]) => {
        this.festivals = festivals;
        this.dataSource.data = this.festivals;
      },
      error: (error) => {
        console.error('Error fetching festivals:', error);
      }
    });
  }

  getFestByName(name: string, event: MouseEvent): void {
    this.appService.getFestivalsByName(name).subscribe({
      next: (festivals: Festival[]) => {
        this.festivals = festivals;
        this.dataSource.data = this.festivals;
      },
      error: (error) => {
        console.error('Error fetching festivals:', error);
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
