import { CalcService } from './calc.service';
import { EditableRecipe } from '../domain/recipe';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ChangeService {

  map = new Map<string, ((recipe: EditableRecipe) => any)[]>();

  constructor(private calcService: CalcService) {

    this.add('vital.bugu', ['vital.og', 'vital.ibu'], (editable: EditableRecipe) => {
      editable.recipe.vital.bugu = this.calcService.balance(editable.recipe.vital.ibu, editable.recipe.vital.og);
    });

    this.add('vital.bv', ['vital.og', 'vital.fg', 'vital.ibu'], (editable: EditableRecipe) => {
      editable.recipe.vital.bv = this.calcService.bv(editable.recipe.vital.og, editable.recipe.vital.fg, editable.recipe.vital.ibu);
    });

    this.add('vital.abv', ['vital.og', 'vital.fg'], (editable: EditableRecipe) => {
      editable.recipe.vital.abv = this.calcService.abv(editable.recipe.vital.og, editable.recipe.vital.fg);
    });

    this.add(
      'vital.og',
      ['vital.batchSize', 'vital.efficiency', 'fermentable.potential', 'fermentable.amount'],
      (editable: EditableRecipe) => {
        editable.recipe.vital.og = this.calcService.og(
          editable.recipe.vital.batchSize,
          editable.recipe.vital.efficiency,
          editable.recipe.fermentables
        );
      }
    );

    this.add(
      'vital.ibu',
      ['vital.og', 'vital.batchSize', 'hop.amount', 'hop.alpha', 'hop.use', 'hop.time', 'hop.form'],
      (editable: EditableRecipe) => {
        const ogNoSugar = this.calcService.og(
          editable.recipe.vital.batchSize,
          editable.recipe.vital.efficiency,
          editable.recipe.fermentables,
          true
        );
        editable.recipe.vital.ibu = this.calcService.ibu(editable.recipe.hops, ogNoSugar, editable.recipe.vital.batchSize);
      }
    );

    this.add('amoutFermentables', ['fermentable.amount'], (editable: EditableRecipe) => {
      editable.recipe.amountFermentables = _.sumBy(editable.recipe.fermentables, f => f.amount);
    });

    this.add('amoutHops', ['hop.amount'], (editable: EditableRecipe) => {
      editable.recipe.amountHops = _.sumBy(editable.recipe.hops, h => h.amount);
    });
  }

  change(field: string, editable: EditableRecipe) {
    if (this.map.has(field)) {
      this.map.get(field).forEach(calc => calc(editable));
    }
  }

  add(fieldName: string, depends: string[], calc: (recipe: EditableRecipe) => any) {
    depends.forEach(field => {
      if ( !this.map.has(field) ) {
        this.map.set(field, []);
      }
      this.map.get(field).push((editable: EditableRecipe) => {
        calc(editable);
        this.change(fieldName, editable);
      });
    });
  }

}
