import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export interface Product {
  name: string;
  id: number;
}
@Component({
  selector: 'app-open-search',
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './open-search.component.html',
  styleUrl: './open-search.component.scss',
})
export class OpenSearchComponent implements OnInit {
  products: Product[] = [];
  filteredProducts$!: Observable<Product[]>;
  searchControl = new FormControl('');
  readonly dialogRef = inject(MatDialogRef<OpenSearchComponent>);
  selectionControl = new FormControl();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();

    this.filteredProducts$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((searchTerm) => this.filterProducts(searchTerm || ''))
    );
  }
  filterProducts(searchTerm: string): Product[] {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseTerm)
    );
  }
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }

  closeSearch() {
    this.dialogRef.close();
  }
  checkSelection() {
    const selectedProduct = this.selectionControl.value;
    if (selectedProduct) {
      this.dialogRef.close(selectedProduct);
    }
  }
}
