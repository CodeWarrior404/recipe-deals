import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnChanges {
  @Input() recipe: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.recipe && this.recipe) {
      this.createMapOfIngredientsFromRecipe(this.recipe);
    }
  }

  private createMapOfIngredientsFromRecipe(recipe: string): any {
    recipe = recipe.replace(/[&\/\\#,+()$~%.'":*?<>{}_@\r\n]/g, ' ');
    console.log(recipe);
    console.log(recipe.split(' '));
    const ingredientArray: string[] = recipe.split(' ');
    const ingredientMap: any = {};

    for (const ingredient of ingredientArray) {
      if (ingredient.length > 2 && !ingredientMap[ingredient]) {
        ingredientMap[ingredient] = true;
      }
    }

    console.log(11111, ingredientMap);
    return ingredientMap;
  }

}
