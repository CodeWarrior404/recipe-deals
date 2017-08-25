import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Ingredient } from '../models/ingredient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  url_findIngredientCategory = 'https://backflipp.wishabi.com/cat_dict?locale=en&all_attributes=true&terms=';

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
}
