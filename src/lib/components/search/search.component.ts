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

  isEditModeOpenHtml: boolean = false;
  searchcodeOpenHtml: string = ``;

  isEditModeOpenTs: boolean = false;
  searchcodeOpenTs: string = ``;

  private readonly tourService = inject(TourService);
  private readonly steps: IStepOption[] = [
    {
      anchorId: 'start-button',
      title: 'Search',
      content: 'Search for a product',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.tourService.initialize(this.steps, {
      enableBackdrop: true,
      backdropConfig: {
        offset: 10,
      },
    });

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

  startTour() {
    this.tourService.start();
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
