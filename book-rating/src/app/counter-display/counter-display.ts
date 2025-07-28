import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter-display',
  imports: [],
  templateUrl: './counter-display.html',
  styleUrl: './counter-display.scss'
})
export class CounterDisplay {
  protected readonly counterValue = signal(0);

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
