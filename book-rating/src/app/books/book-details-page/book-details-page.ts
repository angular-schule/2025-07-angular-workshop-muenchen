import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { Book } from '../shared/book';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss'
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);
  #bookStore = inject(BookStore);

  protected readonly book = signal<Book | undefined>(undefined);

  constructor() {
    // PULL
    // const isbn = this.#route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'

    this.#route.paramMap.pipe(
      map(params => params.get('isbn')),
      filter(isbn => isbn !== null),
      switchMap(isbn => this.#bookStore.getSingle(isbn))
    ).subscribe(b => {
      this.book.set(b);
    });

  }
}


/*
  - ISBN aus der URL ✅
  - Buch abrufen per HTTP
  - Buch anzeigen (ganz simpel)
  */
