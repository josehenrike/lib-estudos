import { Component, Input, OnInit } from '@angular/core';
import { IStepOption, TourService } from 'ngx-ui-tour-md-menu';

@Component({
  selector: 'app-search-tour',
  template: `
    <button
      mat-raised-button
      class="button-start"
      color="primary"
      (click)="startTour()"
    >
      Start Tour
    </button>
  `,
  styleUrls: ['./search-tour.component.scss'],
})
export class SearchTourComponent implements OnInit {
  @Input() steps: IStepOption[] = [];

  constructor(private readonly tourService: TourService) {}

  ngOnInit() {
    if (this.steps && this.steps.length > 0) {
      this.tourService.initialize(this.steps, {
        enableBackdrop: true,
        backdropConfig: {
          offset: 10,
        },
      });
    }
  }

  startTour() {
    this.tourService.start();
  }
}
