import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
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
import { debounceTime, map, startWith } from 'rxjs/operators';
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
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  searchControl = new FormControl();
  filteredProducts$!: Observable<Product[]>;
  selectedProduct: Product | null = null;

  readonly search = inject(MatDialog);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();

    this.filteredProducts$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((searchTerm) => this.filterProducts(searchTerm || ''))
    );
  }
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  filterProducts(searchTerm: string): Product[] {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return this.products.filter((product) => {
      product.name.toLowerCase().includes(lowerCaseTerm);
    });
  }

  openSearch() {
    const searchRef = this.search.open(OpenSearchComponent);
    searchRef.afterClosed().subscribe((result: Product[]) => {
      if (result) {
        this.searchControl.setValue(result[0].name);
        console.log('Dialog result:', result);
      }
    });
  }
}
