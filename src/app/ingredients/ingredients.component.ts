import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnChanges {
  @Input() recipe: string;
  ingredients: Ingredient[];
  ignoreList: any;
  categoryListToDisplay: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.categoryListToDisplay = ['Pantry', 'Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Frozen', 'Deli'];
    this.ignoreList = { 'and': true, 'large': true, 'small': true };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.recipe && this.recipe) {
      this.ingredients = null;
      const ingredients: string[] = this.createListOfIngredientsFromRecipe(this.recipe);
      this.dataService.getIngredientDetails(ingredients)
        .subscribe(data => {
          if (data && data.length > 0) {
            this.ingredients = data;
          }
        });
    }
  }

  private createListOfIngredientsFromRecipe(recipe: string): string[] {
    recipe = recipe.replace(/[&\/\\#,+()$~%.'":*?<>{}_@\r\n]/g, ' ');
    console.log(recipe);
    console.log(recipe.split(' '));
    const ingredientArray: string[] = recipe.split(' ');
    const ingredientMap: any = {};

    for (const ingredient of ingredientArray) {
      if (ingredient.length > 2 && !ingredientMap[ingredient] && !this.ignoreList[ingredient]) {
        ingredientMap[ingredient] = true;
      }
    }

    console.log(11111, Object.keys(ingredientMap));

    return Object.keys(ingredientMap);
  }

}
