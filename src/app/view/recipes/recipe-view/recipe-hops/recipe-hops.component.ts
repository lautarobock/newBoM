import { CalcService } from '../../../../services/calc.service';
import { Util } from '../../../../services/util.service';
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

  constructor(private util: Util, private calcService: CalcService) { super(); }

  ngOnInit() {
    this.forms = this.util.enumValues(HopForm);
    this.uses = this.util.enumValues(HopUse);
    this.times = [-30,-25,-20,-15,-10,-5,0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,90,100,110,120];
  }

  changeHop(hop: Hop,value: number) {
    hop.amount = value / 1000;
    this.editable.change('hop.amount');
  }

  ibus(hop: Hop) {
    return this.calcService.singleIbu(
      hop,
      this.editable.recipe.vital.og,
      this.editable.recipe.vital.batchSize
    );
  }

}
