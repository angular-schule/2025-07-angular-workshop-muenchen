import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  protected books = signal<Book[]>([]);
  protected today = signal(new Date());

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
}


/*
TODO:
- Datenstruktur ✅
- Array mit Büchern
- Daten speichern in Signal
- Template zur Anzeige
- (Buchkomponente?)

*/


