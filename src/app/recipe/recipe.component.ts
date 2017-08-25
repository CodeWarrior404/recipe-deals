import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  @Output() onRecipeChange = new EventEmitter<any>();
  pastedRecipe: string;
  zipCode: string;

  constructor() { }

  ngOnInit() {
    // Default value
    this.zipCode = '75056';
  }

  findDealsClickHandler(): void {
    this.onRecipeChange.emit({
      recipe: this.pastedRecipe ? this.pastedRecipe : '',
      zip: this.zipCode
    });
  }

}
