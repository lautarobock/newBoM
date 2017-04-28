import { Injectable } from '@angular/core';

export class EnumValues extends Array<string> {

    constructor(private obj: any) {
      super(...EnumValues.enumValues(obj));
    }

    private static enumValues(obj): string[] {
      const strings = [];
      // tslint:disable-next-line
      for ( const i in obj ) {
        strings.push(obj[i]);
      }
      return strings.slice(0, strings.length / 2);
    }

}
