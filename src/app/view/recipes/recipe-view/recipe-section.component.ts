import { EditableRecipe } from '../../../domain/recipe';
import { Input } from '@angular/core';

export abstract class RecipeSection {
  
  @Input() editable : EditableRecipe;

}