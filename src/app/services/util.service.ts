import { Injectable } from '@angular/core';

@Injectable()
export class Util {

  constructor() { }

  enumValues(obj) {
    let strings = [];
    for ( let i in obj ) {
      strings.push(obj[i]);
    }
    return strings.slice(0, strings.length/2);
  }
}
