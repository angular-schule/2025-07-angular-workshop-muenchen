import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { DatePipe } from '@angular/common';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { interval, map, Subject, Subscription, takeUntil, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  protected books = signal<Book[]>([]);
  protected today = signal(new Date());

  #ratingHelper = inject(BookRatingHelper);
  #bookStore = inject(BookStore);

  // #destroy$ = new Subject<void>();

  constructor() {
    this.#bookStore.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });

    interval(1000).pipe(
      map(() => new Date()),
      takeUntilDestroyed()
    ).subscribe({
      next: value => {
        this.today.set(value)
        console.log('SUB', value);
      },
      complete: () => console.log('COMPLETE')
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  #updateList(ratedBook: Book) {
    this.books.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      });
    });

    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,6,7,8,9].filter(e => e < 5) // [1, 2, 3, 4]
  }

  doDeleteBook(isbn: string) {
    this.#bookStore.delete(isbn).subscribe(() => {
      // a) Buchliste neu laden
      this.#bookStore.getAll().subscribe(receivedBooks => {
        this.books.set(receivedBooks);
      });

      // b) Liste lokal filtern
      /*this.books.update(currentList => {
        return currentList.filter(b => b.isbn !== isbn);
      });*/
    });

  }

  /*ngOnDestroy() {
    console.log('DESTROY');
    this.#destroy$.next();
  }*/
}


