import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Book } from '../store/models/book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getBooks(userId: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books?userId=${userId}`);
  }
}
