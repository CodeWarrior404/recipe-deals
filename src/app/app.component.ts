import { Component } from '@angular/core';
import { Ingredient } from './models/ingredient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  recipe: string;
  zipCode: string;
  ingredient: Ingredient;

  recipeChangeHandler(payload: any): void {
    this.recipe = payload.recipe;
    this.zipCode = payload.zip;
  }

  ingredientSelectionHandler(ingredient: Ingredient): void {
    this.ingredient = ingredient;
  }
}
