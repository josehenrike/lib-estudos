import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../../lib/components/menu/menu.component';
import { NgModule } from '@angular/core';
import { SearchComponent } from '../../lib/components/search/search.component';
import { AppComponent } from './app.component';
import { DropdownComponent } from '../../lib/components/dropdown/dropdown.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dropdown', component: DropdownComponent },
];
