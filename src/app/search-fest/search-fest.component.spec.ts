import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFestComponent } from './search-fest.component';

describe('SearchFestComponent', () => {
  let component: SearchFestComponent;
  let fixture: ComponentFixture<SearchFestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFestComponent]
    });
    fixture = TestBed.createComponent(SearchFestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
