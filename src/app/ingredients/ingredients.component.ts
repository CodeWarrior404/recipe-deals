import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { Ingredient } from '../models/ingredient';
import { FlyerClipping } from '../models/flyer-clipping';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Flyer } from '../models/flyer';
import { IngredientsHelperService } from '../services/ingredients-helper.service';

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

  constructor(
    private dataService: DataService,
    private ingredientsHelper: IngredientsHelperService) { }

  ngOnInit() {
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
    const ingredients: string[] = this.ingredientsHelper.createListOfIngredientsFromRecipe(this.recipe);

    Observable.forkJoin([
      this.dataService.getAllDataForZip(this.zipCode),
      this.dataService.getIngredientDetails(ingredients)
    ])
      .subscribe(data => {
        const zipCodeData = data[0];
        const ingredientsData = data[1];
        if (ingredientsData && ingredientsData.length > 0) {
          this.ingredients = this.ingredientsHelper.processIngredientsDataForDisplay(ingredientsData, zipCodeData.flyers, this.zipCode);
        }
    });
  }

  ingredientClickHandler(ingredient: Ingredient): void {
    this.selectedIngredient = ingredient;
    this.onIngredientSelect.emit(ingredient);
  }

}
