import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SearchComponent} from './components/search/search.component';
import {FurnitureListComponent} from './components/furniture-list/furniture-list.component';
import {FiltersComponent} from './components/filters/filters.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {OrdersListComponent} from './components/orders-list/orders-list.component';
import {RouterModule, Routes} from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'orders', component: AppComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FurnitureListComponent,
    FiltersComponent,
    OrdersListComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    RouterModule.forRoot(
      routes,
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
