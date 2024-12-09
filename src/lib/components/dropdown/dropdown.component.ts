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
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [ProductService],
})
export class DropdownComponent implements OnInit {
  products: any[] = [];
  prodControl = new FormControl<Product | null>(null, Validators.required);
  selectFormControl = new FormControl(1, Validators.required);

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addOrUpdate(): void {
    const dialogRef = this.dialog.open(DropdownDialogComponent, {
      data: { id: this.prodControl?.value ?? 0 },
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
      } else {
      }
    });
  }

  clearSelection(event: MouseEvent) {
    event.stopPropagation();
    this.prodControl.setValue(null);
  }
}
