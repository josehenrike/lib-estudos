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
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  IStepOption,
  TourMatMenuModule,
  TourService,
} from 'ngx-ui-tour-md-menu';
import { SearchTourComponent } from '../search-tour/search-tour.component';

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
    MatTooltipModule,
    TourMatMenuModule,
    SearchTourComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  steps: IStepOption[] = [
    {
      anchorId: 'start-button',
      title: 'Search',
      content:
        'O Search é um componente de pesquisa que ao clicar no botão de pesquisa, abre uma lista com os itens da pesquisa.  Clique em sua lupa para ampliar a pesquisa',
    },
    {
      anchorId: 'construction-content',
      title: 'Search',
      content:
        'É utilizado o < mat-form-sield>, do material angular, para criar a barra de pesquisa junto com um input para captar os dados.',
    },
    {
      anchorId: 'search-products',
      title: 'Search Products',
      content:
        'Ao clicar no botão de pesquisa, abre uma lista com os itens da pesquisa.',
    },
  ];

  products: Product[] = [];
  searchControl = new FormControl();
  filteredProducts$!: Observable<Product[]>;
  selectedProduct: Product | null = null;
  readonly search = inject(MatDialog);

  isEditMode: boolean = false;
  searchcodehtml: string = ``;

  isEditModets: boolean = false;
  searchcodets: string = ``;

  isEditModeOpenHtml: boolean = false;
  searchcodeOpenHtml: string = ``;

  isEditModeOpenTs: boolean = false;
  searchcodeOpenTs: string = ``;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadCodeFromServer();
    this.loadCodeFromServerTs();
    this.loadCodeFromServerOpenHtml();
    this.loadCodeFromServerOpenTs();
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
    });
  }
  loadCodeFromServer() {
    this.productService.getHtmlCode().subscribe((response) => {
      this.searchcodehtml = response.content;
    });
  }
  loadCodeFromServerOpenHtml() {
    this.productService.getSearchCode().subscribe((response) => {
      this.searchcodeOpenHtml = response.contentCodeSearch;
    });
  }
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  loadCodeFromServerOpenTs() {
    this.productService.getSearchCodeOpenTs().subscribe((response) => {
      this.searchcodeOpenTs = response.contentCodeSearchTs;
    });
  }

  toggleEditModets() {
    this.isEditModets = !this.isEditModets;

    if (!this.isEditModets) {
      this.saveCodeToServerTs();
    }
  }
  toggleEditModehtml() {
    this.isEditMode = !this.isEditMode;

    if (!this.isEditMode) {
      this.saveCodeToServer();
    }
  }
  toggleEditModeOpenHtml() {
    this.isEditModeOpenHtml = !this.isEditModeOpenHtml;

    if (!this.isEditModeOpenHtml) {
      this.saveCodeToServerOpenHtml();
    }
  }
  toggleEditModeOpenTs() {
    this.isEditModeOpenTs = !this.isEditModeOpenTs;

    if (!this.isEditModeOpenTs) {
      this.saveCodeToServerOpenTs();
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
      }
    });
  }

  saveCodeToServerTs() {
    this.productService.updateTsCode(this.searchcodets).subscribe(() => {});
  }
  saveCodeToServer() {
    this.productService.updateHtmlCode(this.searchcodehtml).subscribe(() => {});
  }
  saveCodeToServerOpenHtml() {
    this.productService
      .updateSearchCode(this.searchcodeOpenHtml)
      .subscribe(() => {});
  }
  saveCodeToServerOpenTs() {
    this.productService
      .updateSearchCodeTs(this.searchcodeOpenTs)
      .subscribe(() => {});
  }
}
