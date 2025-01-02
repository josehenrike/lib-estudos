import { MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TourMatMenuModule } from 'ngx-ui-tour-md-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatDialogModule,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    TourMatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  showFiller = false;
  title = 'documentation';
}
