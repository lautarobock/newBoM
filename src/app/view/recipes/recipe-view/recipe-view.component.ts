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
  recipe: any;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipesService.get(this.recipeId).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

}

@Component({
  selector: 'bom-recipe-view-route',
  template: '<bom-recipe-view [recipeId]="recipeId" *ngIf="recipeId"></bom-recipe-view>'
})
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