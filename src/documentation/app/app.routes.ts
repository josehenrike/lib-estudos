import { Routes } from '@angular/router';
import { SearchComponent } from '../../lib/components/search/search.component';
import { DropdownComponent } from '../../lib/components/dropdown/dropdown.component';
import { MenuComponent } from '../../lib/components/menu/menu.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dropdown', component: DropdownComponent },
];
