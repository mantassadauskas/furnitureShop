import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, filter} from "rxjs/internal/operators";
import {ApiService} from "../../services/api.service";
import {dataShareService} from "../../services/data-share.service";
import {NavigationEnd, Router} from "@angular/router";
import {IFurniture, IOrder} from "../../../assets/interfaces/Interfaces";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  furnitureSearch: FormGroup;
  furnitureList: IFurniture[];
  ordersList: IOrder[];
  searchFurnitureResults: { id: string }[];
  searchOrdersResults: { id: string }[];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dataShareService: dataShareService, public router: Router) {
  }

  ngOnInit() {
    this.furnitureSearch = this.formBuilder.group({
      searchField: ['']
    });
    this.dataShareService.allFurniture.subscribe(allFurniture => {
      this.furnitureList = allFurniture;
    });
    this.dataShareService.allOrders.subscribe(allOrders => {
      this.ordersList = allOrders;
    });

    const searchValue = this.furnitureSearch.get('searchField');
    searchValue.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.searchFurnitureResults = [];
        this.searchOrdersResults = [];
        this.searchOrders(value);
        this.searchFurniture(value);
      });
  }

  searchFurniture(value) {
    this.furnitureList.forEach((furniture: IFurniture) => {
      for (let property in furniture) {
        if (furniture[property].includes(value)) {
          this.searchFurnitureResults.push(furniture);
          return
        }
      }
    });
    this.dataShareService.shareFilteredFurnitureList(this.searchFurnitureResults);
  }

  searchOrders(value) {
    this.ordersList.forEach((order: IOrder) => {
      for (let property in order.item) {
        if (order.item[property].includes(value)) {
          this.searchOrdersResults.push(order);
          return
        }
      }
    });
    this.dataShareService.shareFilteredOrdersList(this.searchOrdersResults);
  }
}
