import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class OrderModule {
  date: String;
  item: JSON;

  constructor(furniture) {
    this.date = (new Date(Date.now())).toLocaleString();
    this.item = furniture;
  }
}
