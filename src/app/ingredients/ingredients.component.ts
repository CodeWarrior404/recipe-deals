import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { Ingredient } from '../models/ingredient';
import { Flyer } from '../models/flyer';

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
    // Only display items that fall within these categories
    this.categoryListToDisplay = ['Pantry', 'Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Frozen', 'Deli'];
    // List of words to ignore
    this.ignoreList = { add: true, and: true, information: true, large: true, nutrition: true, servings: true,
      small: true, sprinkle: true, stir: true, the: true, them: true, total: true };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.recipe && this.recipe) {
      this.ingredients = null;
      const ingredients: string[] = this.createListOfIngredientsFromRecipe(this.recipe);
      this.dataService.getIngredientDetails(ingredients)
        .subscribe(data => {
          if (data && data.length > 0) {
            this.ingredients = data;

            for (const ingredient of this.ingredients) {
              if (!this.shouldIngredientBeHidden(ingredient)) {
                this.dataService.getOffers(ingredient.name)
                  .subscribe((flyers: Flyer[]) => {
                    if (flyers && flyers.length > 0) {
                      ingredient.flyers = flyers;
                    }
                  });
              }
            }
          }
        });
    }
  }

  private createListOfIngredientsFromRecipe(recipe: string): string[] {
    recipe = recipe.replace(/[&\/\\#,+()$~%.'":*?<>{}_@;\r\n]/g, ' ');
    const ingredientArray: string[] = recipe.split(' ');
    const ingredientMap: any = {};

    for (const ingredient of ingredientArray) {
      if (ingredient.length > 2 && !ingredientMap[ingredient] && !this.ignoreList[ingredient.toLowerCase()]) {
        ingredientMap[ingredient] = true;
      }
    }

    return Object.keys(ingredientMap);
  }

  shouldIngredientBeHidden(ingredient: Ingredient): boolean {
    return this.categoryListToDisplay.indexOf(ingredient.cat) < 0 || !ingredient.icon_url || ingredient.icon_url === '';
  }

}
