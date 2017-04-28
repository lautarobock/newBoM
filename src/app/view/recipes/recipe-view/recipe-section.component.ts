import { Recipe } from '../../../domain/recipe';

import { Input } from '@angular/core';

export abstract class RecipeSection {

  /**
   * @todo #refact: Refactor cada interfaz en su archivo.
   */
  @Input() recipe = <Recipe>null;

}
