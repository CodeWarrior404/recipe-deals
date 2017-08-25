import { Component } from '@angular/core';
import { Ingredient } from './models/ingredient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  recipe: string;
  ingredient: Ingredient;

  recipeChangeHandler(recipe: string): void {
    this.recipe = recipe;
  }

  ingredientSelectionHandler(ingredient: Ingredient): void {
    this.ingredient = ingredient;
  }
}
