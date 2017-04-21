import { CalcService } from './calc.service';
import { EditableRecipe } from '../domain/recipe';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ChangeService {

  map = new Map<string, ((recipe: EditableRecipe) => any)[]>();

  constructor(private calcService: CalcService) {

    this.add('vital.bugu',['vital.og','vital.ibu'],(editable: EditableRecipe) => {
      editable.recipe.vital.bugu = this.calcService.balance(editable.recipe.vital.ibu, editable.recipe.vital.og);
    });
    
    this.add('vital.bv', ['vital.og','vital.fg','vital.ibu'], (editable:EditableRecipe) => {
      editable.recipe.vital.bv = this.calcService.bv(editable.recipe.vital.og, editable.recipe.vital.fg, editable.recipe.vital.ibu);
    });
    
    this.add('vital.abv', ['vital.og','vital.fg'], (editable:EditableRecipe) => {
      editable.recipe.vital.abv = this.calcService.abv(editable.recipe.vital.og, editable.recipe.vital.fg);
    });

    this.add('vital.og', ['vital.batchSize', 'vital.efficiency', 'fermentable.potential', 'fermentable.amount'], (editable: EditableRecipe) => {
      // editable.recipe.vital.og = this.calcService.ppg2Gravity(70 * editable.recipe.vital.efficiency/100);
      let og = 0;
      editable.recipe.fermentables.forEach(f => {
          og += this.calcService.kg2lbs(f.amount) *
              this.calcService.gravity2Ppg(f.potential) *
              (editable.recipe.vital.efficiency/100) /
              this.calcService.lts2Gal(editable.recipe.vital.batchSize);
      });
      editable.recipe.vital.og = this.calcService.ppg2Gravity(og);
    });

    this.add('amoutFermentables', ['fermentable.amount'], (editable: EditableRecipe) => {
      editable.recipe.amoutFermentables = _.sumBy(editable.recipe.fermentables, f => f.amount);
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
    })
  }

}
