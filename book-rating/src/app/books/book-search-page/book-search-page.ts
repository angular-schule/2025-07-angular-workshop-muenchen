import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { BookStore } from '../shared/book-store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss'
})
export class BookSearchPage {
  #bookStore = inject(BookStore);

  protected searchControl = new FormControl('', { nonNullable: true });

  protected results = toSignal(this.searchControl.valueChanges.pipe(
    debounceTime(300),
    filter(term => term.length >= 3),
    switchMap(term => this.#bookStore.search(term)),
  ), { initialValue: [] });

}
