import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingHelper {
  rateUp(book: Book): Book {
    return {
      ...book,
      // rating: Math.min(book.rating + 1, 5)
      rating: book.rating >= 5 ? 5 : book.rating + 1
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: Math.max(book.rating - 1, 1)
    };
  }

}
