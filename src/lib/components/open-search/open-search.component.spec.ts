import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSearchComponent } from './open-search.component';

describe('OpenSearchComponent', () => {
  let component: OpenSearchComponent;
  let fixture: ComponentFixture<OpenSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
