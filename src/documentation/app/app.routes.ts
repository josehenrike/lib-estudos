import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../../lib/components/menu/menu.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchComponent } from '../../lib/components/search/search.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'search', component: SearchComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
