import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Festival } from '../../model_api'; // Update with correct path and model

@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class FestivalService {
  private selectedFestivalSubject = new BehaviorSubject<any>({});
  selectedFestival$ = this.selectedFestivalSubject.asObservable();

  setSelectedFestival(festival: Festival): void {
    this.selectedFestivalSubject.next(festival);
    console.log("FestivalService: selected festival set to " + festival.idFestival);
  }

  getSelectedFestivalId(): number {
      return this.selectedFestivalSubject.value.idFestival;

  }
}
