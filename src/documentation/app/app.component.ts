import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownComponent } from '../../lib/components/dropdown/dropdown.component';
import { SearchComponent } from '../../lib/components/search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DropdownComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'documentation';
}
