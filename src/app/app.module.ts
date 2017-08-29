import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeComponent } from './recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { DealsComponent } from './deals/deals.component';
import { AccordionModule, ButtonModule, InputTextareaModule, InputTextModule, PanelModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { HttpModule } from '@angular/http';
import { IngredientsHelperService } from './services/ingredients-helper.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    IngredientsComponent,
    DealsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    PanelModule,
    InputTextareaModule,
    ButtonModule,
    InputTextModule,
    AccordionModule
  ],
  providers: [
    DataService,
    IngredientsHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
