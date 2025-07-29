import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-counter-display',
  imports: [],
  templateUrl: './counter-display.html',
  styleUrl: './counter-display.scss'
})
export class CounterDisplay {
  protected readonly counterValue = signal(0);
  // protected readonly counterValue100 = signal(0);

  // Computed vs Effect
  // Computed: wenn Werte für ein Signal berechnet werden sollen
  // Effect: wenn irgendwelcher Code/Logik ausgeführt werden soll, wenn sich ein Signal ändert

  protected readonly counterValue100 = computed(() => this.counterValue() * 100);

  constructor() {
    // Wird nur einmal ausgefuhrt
    console.log('COUNTER INITIAL VALUE', this.counterValue());

    // Effect: Diese Funktion wird immer neu ausgeführt, wenn sich der Counterwert ändert
    effect(() => {
      console.log('EFFECT COUNTER', this.counterValue());

      // das hier lieber mit Computed lösen!
      // const value100 = this.counterValue() * 100;
      // this.counterValue100.set(value100);
    });
  }

  increment() {
    // this.counterValue.set(this.counterValue() + 1);
    this.counterValue.update(value => value + 1);
  }

  decrement() {
    this.counterValue.update(value => value - 1);
  }

  reset() {
    // this.counterValue.update(value => 0)
    this.counterValue.set(0);
  }
}
