import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipeStream = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.recipeStream
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((recipe) => {
        this.processPastedRecipe(recipe);
      });
  }

  pastedRecipeChangeHandler(recipe: string): void {
    this.recipeStream.next(recipe);
  }

  private processPastedRecipe(recipe: string): void {
    console.log(recipe);
  }

}
