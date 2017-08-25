import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Ingredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Flyer } from '../models/flyer';

@Injectable()
export class DataService {
  url_findIngredientCategory = 'https://backflipp.wishabi.com/cat_dict?locale=en&all_attributes=true&terms=';
  url_findFlyers = 'https://backflipp.wishabi.com/flipp/items/search?locale=en-us&postal_code=10011&q=';

  constructor(private http: Http) { }

  getIngredientDetails(ingredients: string[]): Observable<Ingredient[]> {
    let url = this.url_findIngredientCategory;
    for (const ingredient of ingredients) {
      url += (',' + ingredient);
    }
    return this.http
      .get(url)
      .map(response => response.json().search_terms);
  }

  getOffers(ingredient: string): Observable<Flyer[]> {
    return this.http
      .get(this.url_findFlyers + ingredient)
      .map(response => response.json().items);
  }
}
