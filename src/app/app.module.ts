import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { DealsComponent } from './deals/deals.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    IngredientsComponent,
    DealsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
