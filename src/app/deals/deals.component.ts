import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  @Input() ingredient: Ingredient;

  constructor() { }

  ngOnInit() {
  }

}
