import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTourComponent } from './search-tour.component';

describe('SearchTourComponent', () => {
  let component: SearchTourComponent;
  let fixture: ComponentFixture<SearchTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
