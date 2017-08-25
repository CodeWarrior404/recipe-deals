import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  recipe: string;

  recipeChangeHandler(recipe: string): void {
    this.recipe = recipe;
  }
}
