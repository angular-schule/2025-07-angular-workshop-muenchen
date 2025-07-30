import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterDisplay } from "./counter-display/counter-display";
import { DashboardPage } from "./books/dashboard-page/dashboard-page";
import { Observable, Observer, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CounterDisplay, DashboardPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('book-rating');

  constructor() {

    // Producer: generiert die Werte
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(555), 2000);
      setTimeout(() => sub.next(777), 4000);
      setTimeout(() => sub.complete(), 6000);
    }

    // Observer: konsumiert die Daten aus einem Observable
    const observer: Observer<number> = {
      next: (value: number) => console.log(value),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // producer(observer);
    // Observable: Schnittstelle zwischen Producer und Observer
    const myObs$ = new Observable(producer);


    const myObs2$ = new Observable<number>(sub => {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(555), 2000);
      setTimeout(() => sub.next(777), 4000);
      setTimeout(() => sub.complete(), 6000);
    });

/*
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(Math.random()), 2000)
    });

    setTimeout(() => {
      myPromise.then(e => console.log('PROMISE', e));
    }, 5000);
*/
    // myObs$.subscribe(observer);




  }
}
