import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss'
})
export class BookCreatePage {

  #bookStore = inject(BookStore);
  #router = inject(Router);

  protected bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(20)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+([.,]\d{1,2})?$/)
      ]
    }),
  });

  submitForm() {
    const newBook: Book = {
      ...this.bookForm.getRawValue(),
      authors: [], // TODO
      firstThumbnailUrl: ''
    };

    this.#bookStore.create(newBook).subscribe({
      next: createdBook => {
        this.#router.navigate(['/books', createdBook.isbn]);
      },
      error: err => {}
    });
  }
}

/*
TODO
- Validierung: Regeln für die Werte
- Feedback / Fehlermeldungen
- Submit-Button
- Submit-Button deaktivieren, wenn invalide
- Logik zum Abschicken
  - HTTP-Request zum Anlegen des Buchs
  - bei Erfolg:
    - wegnavigieren, z. B. zur Buchliste oder Detailseite
    - Meldung anzeigen
  - alternativ: Formular zurücksetzen

*/
