import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCovoitComponent } from './search-covoit.component';

describe('SearchCovoitComponent', () => {
  let component: SearchCovoitComponent;
  let fixture: ComponentFixture<SearchCovoitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCovoitComponent]
    });
    fixture = TestBed.createComponent(SearchCovoitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
