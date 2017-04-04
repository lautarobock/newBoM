import { RecipesService } from '../../../services/recipes.service';
import { SessionService } from '../../../util/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  constructor(private sessionService: SessionService, private recipesService: RecipesService) { }

  ngOnInit() {
    
    this.sessionService.googleUserId();
  }

}
