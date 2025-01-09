// Angular
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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
import { IStepOption, TourMatMenuModule, TourService } from 'ngx-ui-tour-md-menu';
import { DropdownTourComponent } from "./dropdown-tour/dropdown-tour.component";

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
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    TourMatMenuModule,
    DropdownTourComponent
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [ProductService]
})

export class DropdownComponent implements OnInit {
  steps: IStepOption[] = [
    {
      anchorId: 'tutorial-button',
      title: 'Bem vindo ao Tutorial',
      content: 'Iremos fazer um tour de como utilizar o componente dropdown',
    },
    {
      anchorId: 'selection-button',
      title: 'Campo de Seleção',
      content: 'O campo de seleção serve para selecionar um produto existente.',
    },
    {
      anchorId: 'addoredit-button',
      title: 'Adicionar/Editar',
      content: 'O botão de adicionar/editar serve para adicionar ou editar um produto.',
    },
  ];

  products: any[] = [];
  prodControl = new FormControl<Product | null>(null, Validators.required);
  selectFormControl = new FormControl(1, Validators.required);

  isEditMode: boolean = false;
  isEditModeButton: boolean = false;

  isEditModeButtonTs: boolean = false;
  isEditModeButtonService: boolean = false;

  dropdowncodehtml: string = ``;
  buttoncodehtml: string = ``;

  buttoncodets: string = ``;
  buttoncodeservice: string = ``;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadCodeFromServer();
    this.loadCodeFromServerButton();
    this.loadCodeFromServerButtonTs();
    this.loadCodeFromServerButtonService();
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  loadCodeFromServer() {
    this.productService.getDropdownHtmlCode().subscribe((response) => {
      this.dropdowncodehtml = response.dropdownContentHtml;
      console.log('Código HTML carregado do servidor:', this.dropdowncodehtml);
    });
  }

  loadCodeFromServerButton() {
    this.productService.getButtonHtmlCode().subscribe((response) => {
      this.buttoncodehtml = response.buttonContentHtml;
      console.log('Código HTML carregado do servidor:', this.buttoncodehtml);
    });
  }

  loadCodeFromServerButtonTs() {
    this.productService.getButtonTsCode().subscribe((response) => {
      this.buttoncodets = response.buttonContentTs;
      console.log('Código HTML carregado do servidor:', this.buttoncodets);
    });
  }

  loadCodeFromServerButtonService() {
    this.productService.getButtonServiceCode().subscribe((response) => {
      this.buttoncodeservice = response.buttonContentService;
      console.log('Código HTML carregado do servidor:', this.buttoncodeservice);
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
    this.productService.updateDropdownHtmlCode(this.dropdowncodehtml,).subscribe(() => {
      console.log(
        'Código atualizado enviado ao servidor:',
        this.dropdowncodehtml
      );
    });
  }

  toggleEditModehtmlButton() {
    this.isEditModeButton = !this.isEditModeButton;

    if (!this.isEditModeButton) {
      this.saveCodeToServerHtmlButton();
      console.log('Código atualizado:', this.buttoncodehtml);
    }
  }

  saveCodeToServerHtmlButton() {
    this.productService.updateButtonHtmlCode(this.buttoncodehtml,).subscribe(() => {
      console.log(
        'Código atualizado enviado ao servidor:',
        this.buttoncodehtml
      );
    });
  }

  toggleEditModetsButton() {
    this.isEditModeButtonTs = !this.isEditModeButtonTs;

    if (!this.isEditModeButtonTs) {
      this.saveCodeToServerTsButton();
      console.log('Código atualizado:', this.buttoncodets);
    }
  }

  saveCodeToServerTsButton() {
    this.productService.updateButtonTsCode(this.buttoncodets,).subscribe(() => {
      console.log(
        'Código atualizado enviado ao servidor:',
        this.buttoncodets
      );
    });
  }

  toggleEditModeserviceButton() {
    this.isEditModeButtonService = !this.isEditModeButtonService;

    if (!this.isEditModeButtonService) {
      this.saveCodeToServerServiceButton();
      console.log('Código atualizado:', this.buttoncodeservice);
    }
  }

  saveCodeToServerServiceButton() {
    this.productService.updateButtonServiceCode(this.buttoncodeservice,).subscribe(() => {
      console.log(
        'Código atualizado enviado ao servidor:',
        this.buttoncodeservice
      );
    });
  }
}
