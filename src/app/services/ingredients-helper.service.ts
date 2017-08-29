import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Flyer } from '../models/flyer';
import { FlyerClipping } from '../models/flyer-clipping';
import { DataService } from './data.service';

@Injectable()
export class IngredientsHelperService {

  constructor(private dataService: DataService) { }

  createListOfIngredientsFromRecipe(recipe: string): string[] {
    // List of words to ignore
    const ignoreList: any = { add: true, and: true, information: true, large: true, nutrition: true, servings: true,
      small: true, sprinkle: true, stir: true, the: true, them: true, total: true, 'with': true, knead: true, each: true,
      roll: true };

    recipe = recipe.replace(/[&\/\\#,+()$~%.'":*?<>{}_@;\-\r\n]/g, ' ');
    const ingredientArray: string[] = recipe.split(' ');
    const ingredientMap: any = {};

    for (const ingredient of ingredientArray) {
      if (ingredient.length > 2 && !ingredientMap[ingredient.toLowerCase()] && !ignoreList[ingredient.toLowerCase()]) {
        ingredientMap[ingredient.toLowerCase()] = true;
      }
    }
    return Object.keys(ingredientMap);
  }

  processIngredientsDataForDisplay(ingredients: Ingredient[], flyers: Flyer[], zipCode: string): Ingredient[] {
    const flyerIdMap = {};
    for (const flyer of flyers) {
      flyerIdMap[flyer.id] = flyer;
    }
    ingredients = this.removeDuplicateIngredients(ingredients);
    ingredients = this.removeIngredientsThatCanBeHidden(ingredients);
    for (const ingredient of ingredients) {
      if (!this.shouldIngredientBeHidden(ingredient)) {
        this.dataService.getOffers(ingredient.name, zipCode)
          .subscribe((flyerClippings: FlyerClipping[]) => {
            if (flyerClippings && flyerClippings.length > 0) {
              for (const flyerClipping of flyerClippings) {
                flyerClipping.merchant = (<Flyer> flyerIdMap[flyerClipping.flyer_id]).merchant;
                flyerClipping.merchant_logo = (<Flyer> flyerIdMap[flyerClipping.flyer_id]).merchant_logo;
              }
              ingredient.flyerClippings = flyerClippings;
            } else {
              ingredient.flyerClippings = [];
            }
          });
      }
    }
    return ingredients;
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

  private removeIngredientsThatCanBeHidden(ingredients: Ingredient[]): Ingredient[] {
    for (let i = ingredients.length - 1; i >= 0; i--) {
      if (this.shouldIngredientBeHidden(ingredients[i])) {
        // Non Edible Ingredient
        ingredients.splice(i, 1);
      }
    }
    return ingredients;
  }

  private shouldIngredientBeHidden(ingredient: Ingredient): boolean {
    // Only display items that fall within these categories
    const categoryListToDisplay: string[] = ['Pantry', 'Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Frozen',
      'Beverages', 'Bakery', 'Deli'];
    return categoryListToDisplay.indexOf(ingredient.cat) < 0 || !ingredient.icon_url || ingredient.icon_url === '';
  }

}
