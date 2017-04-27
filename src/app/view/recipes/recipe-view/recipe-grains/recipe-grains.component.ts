import { Util } from '../../../../services/util.service';
import { RecipeSection } from '../recipe-section.component';
import { EditableRecipe, FermentableUse } from '../../../../domain/recipe';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bom-recipe-grains',
  templateUrl: './recipe-grains.component.html',
  styleUrls: ['./recipe-grains.component.css']
})
export class RecipeGrainsComponent extends RecipeSection implements OnInit {

  uses: string[] = [];

  constructor(private util: Util) { super(); }

  ngOnInit() {
    this.uses = this.util.enumValues(FermentableUse);
  }

}
