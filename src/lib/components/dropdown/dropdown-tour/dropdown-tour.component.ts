import { Component, inject, Input } from '@angular/core';
import { IStepOption, TourService } from 'ngx-ui-tour-md-menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dropdown-tour',
  imports: [MatButtonModule],
  templateUrl: './dropdown-tour.component.html',
  styleUrl: './dropdown-tour.component.scss'
})
export class DropdownTourComponent {
  @Input() steps: IStepOption[] = [];

  constructor(private readonly tourService: TourService) { }

  ngOnInit() {
    this.tourService.initialize(this.steps, {
      enableBackdrop: true,
      backdropConfig: {
        offset: 10,
      },
    });
  }

  startTour() {
    this.tourService.start();
  }

}
