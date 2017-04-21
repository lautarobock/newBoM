import { RecipeSection } from '../recipe-section.component';
import { Recipe, EditableRecipe } from '../../../../domain/recipe';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bom-recipe-general',
  templateUrl: './recipe-general.component.html',
  styleUrls: ['./recipe-general.component.css']
})
export class RecipeGeneralComponent extends RecipeSection implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
