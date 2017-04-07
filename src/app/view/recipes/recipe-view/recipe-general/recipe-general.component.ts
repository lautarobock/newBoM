import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bom-recipe-general',
  templateUrl: './recipe-general.component.html',
  styleUrls: ['./recipe-general.component.css']
})
export class RecipeGeneralComponent implements OnInit {

  @Input() recipe;

  constructor() { }

  ngOnInit() {
  }

}
