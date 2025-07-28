import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterDisplay } from "./counter-display/counter-display";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CounterDisplay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('book-rating');
}
