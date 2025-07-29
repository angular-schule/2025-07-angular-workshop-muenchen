import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { DatePipe } from '@angular/common';
import { BookRatingHelper } from '../shared/book-rating-helper';

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

  constructor() {
    setInterval(() => {
      this.today.set(new Date())
    }, 1000);

    this.books.set([
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 42.9,
        authors: ['FM', 'DK', 'JH']
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 36.9,
        authors: ['FD']
      },
    ]);
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
}


