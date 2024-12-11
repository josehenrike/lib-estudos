import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { OpenSearchComponent } from '../open-search/open-search.component';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Product {
  name: string;
  id: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  searchControl = new FormControl('');
  filteredProducts$!: Observable<Product[]>;

  readonly search = inject(MatDialog);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();

    this.filteredProducts$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Começa com uma string vazia
      debounceTime(300), // Espera 300ms após o usuário digitar
      map((searchTerm) => this.filterProducts(searchTerm || '')) // Aplica o filtro
    );
  }
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
  filterProducts(searchTerm: string): Product[] {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseTerm)
    );
  }
  openSearch() {
    const searchRef = this.search.open(OpenSearchComponent);
    searchRef.afterClosed().subscribe((result: Product | null) => {
      console.log('Dialog result:', result);
    });
  }
}
