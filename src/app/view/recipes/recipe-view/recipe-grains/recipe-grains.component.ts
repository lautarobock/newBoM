import { EditableRecipe, FermentableUse } from '../../../../domain/recipe';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bom-recipe-grains',
  templateUrl: './recipe-grains.component.html',
  styleUrls: ['./recipe-grains.component.css']
})
export class RecipeGrainsComponent implements OnInit {

  @Input() editable : EditableRecipe;
  uses: string[] = [];
  
  constructor() { }

  ngOnInit() {
    for ( let i in FermentableUse ) {
      this.uses.push(FermentableUse[i]);
    }
    this.uses = this.uses.slice(0, this.uses.length/2);
  }

}
