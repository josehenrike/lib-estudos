import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  pesquisarProduto(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      params: { name },
    });
  }
  updateHtmlCode(htmlCode: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/code', {
      content: htmlCode,
    });
  }
  getHtmlCode(): Observable<{ content: string }> {
    return this.http.get<{ content: string }>('http://localhost:3000/code');
  }

  getTSCode(): Observable<{ contentCodeTs: string }> {
    return this.http.get<{ contentCodeTs: string }>(
      'http://localhost:3000/codeTs'
    );
  }
  getSearchCode(): Observable<{ contentCodeSearch: string }> {
    return this.http.get<{ contentCodeSearch: string }>(
      'http://localhost:3000/CodeSearch'
    );
  }
  getSearchCodeOpenTs(): Observable<{ contentCodeSearchTs: string }> {
    return this.http.get<{ contentCodeSearchTs: string }>(
      'http://localhost:3000/codeSearchTs'
    );
  }
  updateDropdownHtmlCode(dropdownCodeHtml: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/dropdownCodeHtml', {
      dropdownContentHtml: dropdownCodeHtml,
    });
  }

  getDropdownHtmlCode(): Observable<{ dropdownContentHtml: string }> {
    return this.http.get<{ dropdownContentHtml: string }>(
      'http://localhost:3000/dropdownCodeHtml'
    );
  }

  updateTsCode(tsCode: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/codeTs', {
      contentCodeTs: tsCode,
    });
  }

  updateSearchCode(CodeSearch: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/CodeSearch', {
      contentCodeSearch: CodeSearch,
    });
  }
  updateSearchCodeTs(codeSearchTs: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/codeSearchTs', {
      contentCodeSearchTs: codeSearchTs,
    });
  }

  updateButtonHtmlCode(buttonCodeHtml: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/buttonCodeHtml', {
      buttonContentHtml: buttonCodeHtml,
    });
  }

  getButtonHtmlCode(): Observable<{ buttonContentHtml: string }> {
    return this.http.get<{ buttonContentHtml: string }>(
      'http://localhost:3000/buttonCodeHtml'
    );
  }

  updateButtonTsCode(buttonCodeTs: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/buttonCodeTs', {
      buttonContentTs: buttonCodeTs,
    });
  }

  getButtonTsCode(): Observable<{ buttonContentTs: string }> {
    return this.http.get<{ buttonContentTs: string }>(
      'http://localhost:3000/buttonCodeTs'
    );
  }

  updateButtonServiceCode(buttonCodeService: string): Observable<void> {
    return this.http.put<void>('http://localhost:3000/buttonCodeService', {
      buttonContentService: buttonCodeService,
    });
  }

  getButtonServiceCode(): Observable<{ buttonContentService: string }> {
    return this.http.get<{ buttonContentService: string }>(
      'http://localhost:3000/buttonCodeService'
    );
  }
}
