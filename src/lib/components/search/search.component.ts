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
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule,
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
  isEditMode: boolean = false;
  searchcodehtml: string = ``;

  isEditModets: boolean = false;
  searchcodets: string = ``;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadCodeFromServer();
    this.loadCodeFromServerTs();
    this.loadProducts();

    this.filteredProducts$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((searchTerm) => {
        if (typeof searchTerm !== 'string') {
          searchTerm = '';
        }
        return this.filterProducts(searchTerm);
      })
    );
  }

  loadCodeFromServerTs() {
    this.productService.getTSCode().subscribe((response) => {
      this.searchcodets = response.contentCodeTs;
      console.log('Código TS carregado do servidor:', this.searchcodets);
    });
  }
  loadCodeFromServer() {
    this.productService.getHtmlCode().subscribe((response) => {
      this.searchcodehtml = response.content;
      console.log('Código HTML carregado do servidor:', this.searchcodehtml);
    });
  }
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  toggleEditModets() {
    this.isEditModets = !this.isEditModets;

    if (!this.isEditModets) {
      this.saveCodeToServerTs();
      console.log('Código atualizado:', this.searchcodets);
    }
  }
  toggleEditModehtml() {
    this.isEditMode = !this.isEditMode;

    if (!this.isEditMode) {
      this.saveCodeToServer();
      console.log('Código atualizado:', this.searchcodehtml);
    }
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

  saveCodeToServerTs() {
    this.productService.updateTsCode(this.searchcodets).subscribe(() => {
      console.log('Código atualizado enviado ao servidor:', this.searchcodets);
    });
  }
  saveCodeToServer() {
    this.productService.updateHtmlCode(this.searchcodehtml).subscribe(() => {
      console.log(
        'Código atualizado enviado ao servidor:',
        this.searchcodehtml
      );
    });
  }
}
