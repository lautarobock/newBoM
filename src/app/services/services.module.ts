import { Util } from './util.service';
import { RecipesService } from './recipes.service';
import { CalcService, Srm2Rgb, Gravity2Ppg } from './calc.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeService } from './change.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [Srm2Rgb, Gravity2Ppg],
  providers: [RecipesService, CalcService, ChangeService, Util],
  declarations: [Srm2Rgb, Gravity2Ppg]
})
export class ServicesModule { }
