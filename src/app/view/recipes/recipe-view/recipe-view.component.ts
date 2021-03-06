import { Subscription } from 'rxjs/Rx';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { ChangeService } from '../../../services/change.service';
import { CalcService } from '../../../services/calc.service';
import { Bom1Fermentable, Bom1Hop, Bom1Recipe, Bom1Vital, Recipe, Vital, Hop, Fermentable } from '../../../domain/recipe';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipesService } from '../../../services/recipes.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'bom-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit, OnDestroy {

  @Input() recipeId: string;
  recipe: Recipe;
  watcher: Subscription;
  isLtSm: boolean;
  unsubscribeChange;
  progress = 0;
  context = {
    advanced: false
  };

  constructor(
    private recipesService: RecipesService,
    private calcService: CalcService,
    private changeService: ChangeService,
    public media: ObservableMedia
  ) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.isLtSm = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });
    this.isLtSm = this.media.isActive('xs') || this.media.isActive('sm');
  }

  ngOnInit() {
    this.recipesService.get(this.recipeId).subscribe(recipe => {      
      this.recipe = new Bom1Recipe(
        recipe, 
        this.calcService, 
        this.changeService
      );
    });
    this.unsubscribeChange = this.changeService.onChange((value) => this.save());
  }

  ngOnDestroy() {
    this.unsubscribeChange.unsubscribe();
  }

  save() {
    // sould disable fields in the middle?
    this.progress = 10;
    this.recipesService.save((<Bom1Recipe>this.recipe).object).subscribe(
      recipe => {
        (<Bom1Recipe>this.recipe).object.version = recipe.version
        this.progress = 0;
      },
      err => console.log('ERR', err)
    );
  }


}

@Component({
  selector: 'bom-recipe-view-route',
  template: '<bom-recipe-view [recipeId]="recipeId" *ngIf="recipeId"></bom-recipe-view>'
})
// tslint:disable-next-line
export class RecipeViewRouteDecorator implements OnInit {

  recipeId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => this.recipeId = params.id);
  }
}
