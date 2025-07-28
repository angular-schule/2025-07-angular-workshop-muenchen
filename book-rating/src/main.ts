import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));




//////////////////////////////////



export class Customer {
  // Property
  #name?: string;

  protected role = 'admin';

  #id = 5;

  constructor() {
    this.#name = 'Ferdinand';
    this.#fooBar(5);
  }

  #fooBar(arg: number): string {
    this.#name = 'dfhdfjk';
    setTimeout(() => {
      console.log(this.#name);
    }, 2000);
    return '';
  }
}


export class UnprivilegedCustomer extends Customer {
  constructor() {
    super();
    this.role = 'user'; // möglich weil protected
    // this.#name = ''; // nicht möglich weil private
  }
}


export const myCustomer = new Customer();
// myCustomer.#name = 'dfdsf'; // geht nicht
// myCustomer.id = 6
// myCustomer.role = 6

const foo = 5;
// foo = 6;


//////////////////////////////////


/*const abc = function (arg) {
  return arg + 1;
}



const abc1 = (arg: number) => true;*/





//////////////////////////////////

export function bar(arg: string | number) {
  if (typeof arg === 'number') {
    return arg + 1;
  } else {
    return arg;
  }
}

bar(5)
bar('')
// bar(true) // geht nicht
