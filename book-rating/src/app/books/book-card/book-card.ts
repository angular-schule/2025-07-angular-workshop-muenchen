import { Component, computed, input } from '@angular/core';
import { Book } from '../shared/book';
import { CurrencyPipe } from '@angular/common';
import { RatingDisplay } from '../rating-display/rating-display';

@Component({
  selector: 'app-book-card',
  imports: [CurrencyPipe, RatingDisplay],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})
export class BookCard {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  readonly book = input.required<Book>();
  readonly headline = input('Hallo Welt');

  protected readonly authorList = computed(() => this.book().authors.join(', '));


  // AUFGABE:
  // Computed bauen, das das Autoren-Array zu einem großen String zusammenführt
  // dann im Template anzeigen
}
