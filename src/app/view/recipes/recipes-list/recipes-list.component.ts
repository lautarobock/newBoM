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
  scrollWindow = false;

  constructor(
    private sessionService: SessionService, 
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    if ( this.sessionService.token() ) {
      this.loadData();
    } else {
      this.sessionService.onUserChange.subscribe(googleUser => {
        this.loadData();
      });
    }
  }

  private loadData() {
    this.recipesService.myRecipes(this.limit, this.skip).subscribe(recipes => {
      if ( this.recipes ) {
        this.recipes.push(...recipes);
      } else {
        this.recipes = recipes;
      }
      this.skip += this.limit;
      this.more = recipes.length !== 0;
      if ( !this.containerHasScrollBar() ) this.onScroll();
    });
  }

  onScroll() {
    if (this.more) {
      this.loadData();
    }
  }

  private containerHasScrollBar(): boolean {
    return document.documentElement.scrollHeight > (window.innerHeight + window.pageYOffset);
  }

}
