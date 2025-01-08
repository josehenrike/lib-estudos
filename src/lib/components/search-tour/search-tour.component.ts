import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IStepOption, TourService } from 'ngx-ui-tour-md-menu';

@Component({
  selector: 'app-search-tour',
  imports: [],
  templateUrl: './search-tour.component.html',
  styleUrl: './search-tour.component.scss',
})
export class SearchTourComponent implements OnInit {
  private readonly tourService = inject(TourService);
  private readonly steps: IStepOption[] = [
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

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.tourService.initialize(this.steps, {
      enableBackdrop: true,
      backdropConfig: {
        offset: 10,
      },
    });
  }
}
