import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { CounterDisplay } from './counter-display/counter-display';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad ist fast immer pathMatch:full nötig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  ...booksRoutes,
  { path: 'counter', component: CounterDisplay }
];
