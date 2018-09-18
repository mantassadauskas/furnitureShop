import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class OrderModule {
  date: number;
  item: JSON;

  constructor(furniture) {
    this.date = Date.now();
    this.item = furniture;
  }
}
