import { Component, computed, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { CurrencyPipe } from '@angular/common';
import { RatingDisplay } from '../rating-display/rating-display';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  imports: [CurrencyPipe, RatingDisplay, RouterLink],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})
export class BookCard {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  readonly book = input.required<Book>();
  readonly headline = input('Hallo Welt');

  // Output: hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  readonly rateUp = output<Book>();
  readonly rateDown = output<Book>();
  readonly deleteBook = output<Book>();

  protected readonly authorList = computed(() => this.book().authors.join(', '));

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }

  doDeleteBook() {
    this.deleteBook.emit(this.book());
  }
}
