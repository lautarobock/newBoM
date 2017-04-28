import { CalcService } from '../../../../services/calc.service';
import { EnumValues } from '../../../../services/util';
import { Hop, HopForm, HopUse } from '../../../../domain/recipe';
import { RecipeSection } from '../recipe-section.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bom-recipe-hops',
  templateUrl: './recipe-hops.component.html',
  styleUrls: ['./recipe-hops.component.css']
})
export class RecipeHopsComponent extends RecipeSection implements OnInit {

  forms: string[] = [];
  uses: string[] = [];
  times: number[] = [];

  constructor(private calcService: CalcService) { super(); }

  ngOnInit() {
    this.forms = new EnumValues(HopForm);
    this.uses = new EnumValues(HopUse);
    this.times = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120];
  }

  changeHop(hop: Hop, value: number) {
    hop.amount = value / 1000;
  }

  ibus(hop: Hop) {
    const ogNoSugar = this.calcService.og(
      this.recipe.vital.batchSize,
      this.recipe.vital.efficiency,
      this.recipe.fermentables,
      true
    );
    return this.calcService.singleIbu(
      hop,
      ogNoSugar,
      this.recipe.vital.batchSize
    );
  }

}
