import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RecipeViewComponent, RecipeViewRouteDecorator } from './recipe-view/recipe-view.component';
import { MaterialModule } from '@angular/material';
import { RecipeGeneralComponent } from './recipe-view/recipe-general/recipe-general.component';
import { RecipeGrainsComponent } from './recipe-view/recipe-grains/recipe-grains.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ServicesModule } from '../../services/services.module';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ServicesModule,
    InfiniteScrollModule,
    FormsModule
  ],
  exports: [
    RecipeViewRouteDecorator, 
    RecipesListComponent
  ],
  declarations: [
    RecipeViewComponent, 
    RecipeViewRouteDecorator, 
    RecipeGeneralComponent, 
    RecipeGrainsComponent, 
    RecipesListComponent
  ]
})
export class RecipesModule { }
