import { CalcService } from './calc.service';
import { Recipe } from '../domain/recipe';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ChangeService {

  map = new Map<string, ((recipe: Recipe) => any)[]>();

  constructor(private calcService: CalcService) {

    this.add('vital.bv', ['vital.og', 'vital.fg', 'vital.ibu'], (recipe: Recipe) => {
      recipe.vital.bv = this.calcService.bv(recipe.vital.og, recipe.vital.fg, recipe.vital.ibu);
    });

    this.add('vital.abv', ['vital.og', 'vital.fg'], (recipe: Recipe) => {
      recipe.vital.abv = this.calcService.abv(recipe.vital.og, recipe.vital.fg);
    });

    this.add(
      'vital.og',
      ['vital.batchSize', 'vital.efficiency', 'fermentable.potential', 'fermentable.amount'],
      (recipe: Recipe) => {
        recipe.vital.og = this.calcService.og(
          recipe.vital.batchSize,
          recipe.vital.efficiency,
          recipe.fermentables
        );
      }
    );

    this.add(
      'vital.ibu',
      ['vital.og', 'vital.batchSize', 'hop.amount', 'hop.alpha', 'hop.use', 'hop.time', 'hop.form'],
      (recipe: Recipe) => {
        const ogNoSugar = this.calcService.og(
          recipe.vital.batchSize,
          recipe.vital.efficiency,
          recipe.fermentables,
          true
        );
        recipe.vital.ibu = this.calcService.ibu(recipe.hops, ogNoSugar, recipe.vital.batchSize);
      }
    );

    this.add('amoutFermentables', ['fermentable.amount'], (recipe: Recipe) => {
      recipe.amountFermentables = _.sumBy(recipe.fermentables, f => f.amount);
    });

    this.add('amoutHops', ['hop.amount'], (recipe: Recipe) => {
      recipe.amountHops = _.sumBy(recipe.hops, h => h.amount);
    });
  }

  change(field: string, recipe: Recipe) {
    if (this.map.has(field)) {
      this.map.get(field).forEach(calc => calc(recipe));
    }
  }

  add(fieldName: string, depends: string[], calc: (recipe: Recipe) => any) {
    depends.forEach(field => {
      if ( !this.map.has(field) ) {
        this.map.set(field, []);
      }
      this.map.get(field).push((recipe: Recipe) => {
        calc(recipe);
        this.change(fieldName, recipe);
      });
    });
  }

}
