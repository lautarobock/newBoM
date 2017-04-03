import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { MaterialModule } from '@angular/material';
import { RecipeGeneralComponent } from './recipe-view/recipe-general/recipe-general.component';
import { RecipeGrainsComponent } from './recipe-view/recipe-grains/recipe-grains.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [RecipeViewComponent],
  declarations: [RecipeViewComponent, RecipeGeneralComponent, RecipeGrainsComponent]
})
export class RecipesModule { }
