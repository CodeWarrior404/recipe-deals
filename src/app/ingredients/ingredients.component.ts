import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() zipCode: string;
  @Output() onIngredientSelect = new EventEmitter<Ingredient>();
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  ignoreList: any;
  categoryListToDisplay: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Only display items that fall within these categories
    this.categoryListToDisplay = ['Pantry', 'Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Frozen', 'Beverages', 'Bakery', 'Deli'];
    // List of words to ignore
    this.ignoreList = { add: true, and: true, information: true, large: true, nutrition: true, servings: true,
      small: true, sprinkle: true, stir: true, the: true, them: true, total: true, 'with': true };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.recipe && this.recipe) {
      setTimeout(() => this.processRecipe());
    }
    if (changes && changes.zipCode && this.recipe) {
      setTimeout(() => this.processRecipe());
    }
  }

  private processRecipe(): void {
    this.ingredients = null;
    this.selectedIngredient = null;
    this.onIngredientSelect.emit();
    const ingredients: string[] = this.createListOfIngredientsFromRecipe(this.recipe);
    this.dataService.getIngredientDetails(ingredients)
      .subscribe(data => {
        if (data && data.length > 0) {
          this.ingredients = this.removeDuplicateIngredients(data);

          for (const ingredient of this.ingredients) {
            if (!this.shouldIngredientBeHidden(ingredient)) {
              this.dataService.getOffers(ingredient.name, this.zipCode)
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

  private removeDuplicateIngredients(ingredients: Ingredient[]): Ingredient[] {
    const priorityRankMap = {};
    for (let i = ingredients.length - 1; i >= 0; i--) {
      if (priorityRankMap[ingredients[i].priority_rank]) {
        // Duplicate found
        ingredients.splice(i, 1);
      } else {
        priorityRankMap[ingredients[i].priority_rank] = true;
      }
    }
    return ingredients;
  }

  private createListOfIngredientsFromRecipe(recipe: string): string[] {
    recipe = recipe.replace(/[&\/\\#,+()$~%.'":*?<>{}_@;\-\r\n]/g, ' ');
    const ingredientArray: string[] = recipe.split(' ');
    const ingredientMap: any = {};

    for (const ingredient of ingredientArray) {
      if (ingredient.length > 2 && !ingredientMap[ingredient.toLowerCase()] && !this.ignoreList[ingredient.toLowerCase()]) {
        ingredientMap[ingredient.toLowerCase()] = true;
      }
    }

    return Object.keys(ingredientMap);
  }

  shouldIngredientBeHidden(ingredient: Ingredient): boolean {
    return this.categoryListToDisplay.indexOf(ingredient.cat) < 0 || !ingredient.icon_url || ingredient.icon_url === '';
  }

  ingredientClickHandler(ingredient: Ingredient): void {
    this.selectedIngredient = ingredient;
    this.onIngredientSelect.emit(ingredient);
  }

}
