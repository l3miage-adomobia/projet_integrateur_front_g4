import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterFestService {

  private filterSubject = new BehaviorSubject<any>({});
  currentFilter = this.filterSubject.asObservable();

  setFilter(filter: any) {
    this.filterSubject.next(filter);
    console.log(filter);
  }

  getFilter() {
    return this.filterSubject.value;
  }
}
