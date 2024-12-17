// Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Local
import { DropdownDialogComponent } from './dropdowndialog/dropdowndialog.component';
import { ProductService } from '../../services/product.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [ProductService],
})
export class DropdownComponent implements OnInit {
  products: any[] = [];
  prodControl = new FormControl<Product | null>(null, Validators.required);
  selectFormControl = new FormControl(1, Validators.required);
  isEditMode: boolean = false;
  dropdowncodehtml: string = ``;
  isEditModets: boolean = false;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCodeFromServer();
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  loadCodeFromServer() {
    this.productService.getDropdownHtmlCode().subscribe((response) => {
      this.dropdowncodehtml = response.content;
      console.log('Código HTML carregado do servidor:', this.dropdowncodehtml);
    });
  }

  addOrUpdate(): void {
    const selectedId = this.prodControl?.value ?? 0;
    const selectedProduct = this.products.find(
      (product) => product.id === selectedId
    );

    const dialogRef = this.dialog.open(DropdownDialogComponent, {
      data: {
        id: selectedId,
        name: selectedProduct?.name ?? '',
      },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id > 0) {
          this.productService.updateProduct(result).subscribe(() => {
            const index = this.products.findIndex((p) => p.id === result.id);
            if (index !== -1) {
              this.products[index] = result;
            }
          });
        } else {
          this.productService.addProduct(result).subscribe((newProduct) => {
            this.products.push(newProduct);
          });
        }
      }
    });
  }

  clearSelection(event: MouseEvent) {
    event.stopPropagation();
    this.prodControl.setValue(null);
  }

  toggleEditModehtml() {
    this.isEditMode = !this.isEditMode;

    if (!this.isEditMode) {
      this.saveCodeToServer();
      console.log('Código atualizado:', this.dropdowncodehtml);
    }
  }

  saveCodeToServer() {
    this.productService.updateDropdownHtmlCode(this.dropdowncodehtml).subscribe(() => {
      console.log(
        'Código atualizado enviado ao servidor:',
        this.dropdowncodehtml
      );
    });
  }
}
