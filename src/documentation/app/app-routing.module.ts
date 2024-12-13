import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchComponent } from '../../lib/components/search/search.component';
import { AppComponent } from './app.component';
import { DropdownComponent } from '../../lib/components/dropdown/dropdown.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'search', component: SearchComponent },
  { path: 'dropdown', component: DropdownComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
