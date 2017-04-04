import { RecipesService } from './recipes.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [RecipesService],
  declarations: []
})
export class ServicesModule { }
