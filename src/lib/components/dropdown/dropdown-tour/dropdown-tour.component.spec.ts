import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownTourComponent } from './dropdown-tour.component';

describe('DropdownTourComponent', () => {
  let component: DropdownTourComponent;
  let fixture: ComponentFixture<DropdownTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
