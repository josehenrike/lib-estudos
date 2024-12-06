import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-open-search',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './open-search.component.html',
  styleUrl: './open-search.component.scss',
})
export class OpenSearchComponent {}
