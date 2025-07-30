import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStore {

  #http = inject(HttpClient);
  #apiUrl = 'https://api.angular.schule';

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiUrl + '/books');
  }

  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(this.#apiUrl + '/books/' + isbn);
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(this.#apiUrl + '/books', book);
  }

  search(term: string) {
    return this.#http.get<Book[]>(this.#apiUrl + '/books/search/' + term);
  }

  delete(isbn: string): Observable<unknown> {
    // { delete: true }
    return this.#http.delete<unknown>(this.#apiUrl + '/books/' + isbn);
  }

}
