import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface Product {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [ProductService]
})

export class DropdownComponent implements OnInit {
  products: any[] = [];
  prodControl = new FormControl<Product | null>(null, Validators.required);
  selectFormControl = new FormControl(1, Validators.required);

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}