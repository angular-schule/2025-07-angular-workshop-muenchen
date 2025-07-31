import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, interval, map, Observable, Observer, of, Subscriber, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('book-rating');

  constructor() {

    // of('München', 'Stuttgart', 'Frankfurt')
    // interval(1000)       // ---0---1---2---3---4---5 ...
    // timer(2000)          // ------0|
    // timer(2000, 1000)    // ------0---1---2---3---4---5 ...
    // timer(0, 1000)       // 0---1---2---3---4---5 ...


    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    )/*.subscribe({
      next: e => console.log(e),
      complete: () => console.log('COMPLETE')
    })*/

    //////////////////////////////////////

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
