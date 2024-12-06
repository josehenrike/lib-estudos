import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownComponent } from "../../lib/components/dropdown/dropdown.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'documentation';
}
