import { RecipesService } from './recipes.service';
import { CalcService, Srm2Rgb, Gravity2Ppg } from './calc.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[Srm2Rgb, Gravity2Ppg],
  providers: [RecipesService, CalcService],
  declarations: [Srm2Rgb, Gravity2Ppg]
})
export class ServicesModule { }
