import { RecipesService } from '../../../services/recipes.service';
import { SessionService } from '../../../util/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bom-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: any[];
  skip = 0;
  limit = 15;
  more = true;

  constructor(private sessionService: SessionService, private recipesService: RecipesService) { }

  ngOnInit() {
    this.sessionService.onUserChange.subscribe(googleUser => {
      this.recipesService.myRecipes(this.limit, this.skip).subscribe(recipes => {
        this.recipes = recipes;
        this.more = recipes.length !== 0;
      });
    });
  }

  onScroll() {
    if ( this.more ) {
      this.skip += this.limit;
      this.recipesService.myRecipes(this.limit, this.skip).subscribe(recipes => {
        this.recipes.push(...recipes);
        this.more = recipes.length !== 0;
      });
    }
  }

}
