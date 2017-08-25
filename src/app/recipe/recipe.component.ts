import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  pastedRecipe: string;

  constructor() { }

  ngOnInit() {
  }

  findDealsClickHandler(): void {
    console.log(this.pastedRecipe);
  }

}
