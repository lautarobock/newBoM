import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesModule } from './recipes/recipes.module';

@NgModule({
  imports: [
    CommonModule,
    RecipesModule
  ],
  exports: [RecipesModule],
  declarations: []
})
export class ViewModule { }
