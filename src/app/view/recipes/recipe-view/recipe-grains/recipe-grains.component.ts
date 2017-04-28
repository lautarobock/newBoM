import { EnumValues } from '../../../../services/util';
import { RecipeSection } from '../recipe-section.component';
import { FermentableUse } from '../../../../domain/recipe';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bom-recipe-grains',
  templateUrl: './recipe-grains.component.html',
  styleUrls: ['./recipe-grains.component.css']
})
export class RecipeGrainsComponent extends RecipeSection implements OnInit {

  uses: string[];

  constructor() { super(); }

  ngOnInit() {
    this.uses = new EnumValues(FermentableUse);
  }

}
