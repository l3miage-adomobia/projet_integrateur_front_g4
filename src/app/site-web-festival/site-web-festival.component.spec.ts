import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteWebFestivalComponent } from './site-web-festival.component';

describe('SiteWebFestivalComponent', () => {
  let component: SiteWebFestivalComponent;
  let fixture: ComponentFixture<SiteWebFestivalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteWebFestivalComponent]
    });
    fixture = TestBed.createComponent(SiteWebFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
