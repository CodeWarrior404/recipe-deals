import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  @Output() onRecipeChange = new EventEmitter<string>();
  pastedRecipe: string;

  constructor() { }

  ngOnInit() {
  }

  findDealsClickHandler(): void {
    this.onRecipeChange.emit(this.pastedRecipe ? this.pastedRecipe : '');
  }

}
