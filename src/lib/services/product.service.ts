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
  [x: string]: any;
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateProduct(id: number, name: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, name);
  }

  createProduct(name: any): Observable<any> {
    return this.http.post(this.apiUrl, name);
  }

  pesquisarProduto(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      params: { name },
    });
  }
}
