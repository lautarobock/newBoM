import { Subscription } from 'rxjs/Rx';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { ChangeService } from '../../../services/change.service';
import { CalcService } from '../../../services/calc.service';
import { Bom1Recipe, EditableRecipe } from '../../../domain/recipe';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipesService } from '../../../services/recipes.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bom-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  @Input() recipeId: string;
  editable: EditableRecipe;
  watcher: Subscription;
  isLtSm: boolean;

  constructor(
    private recipesService: RecipesService,
    private calcService: CalcService,
    private changeService: ChangeService,
    public media: ObservableMedia
  ) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.isLtSm = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });
  }

  ngOnInit() {
    this.recipesService.get(this.recipeId).subscribe(recipe => {
      this.editable = new EditableRecipe(
        new Bom1Recipe(recipe, this.calcService),
        this.calcService,
        this.changeService
      );
    });
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
