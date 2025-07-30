import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";
import { BookCreatePage } from "./book-create-page/book-create-page";
import { BookSearchPage } from "./book-search-page/book-search-page";

export const booksRoutes: Routes = [
  { path: 'books', component: DashboardPage },
  { path: 'books/create', component: BookCreatePage },
  { path: 'books/search', component: BookSearchPage },
  { path: 'books/:isbn', component: BookDetailsPage },
];
