import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {dataShareService} from "../../services/data-share.service";
import {IFurniture, IOrder} from "../../../assets/interfaces/Interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  furnitureList: IFurniture[];
  filteredFurnitureList: IFurniture[];
  properties: {};
  propertiesArray = [];
  filters: FormGroup;
  fbProperties: {};
  selectedFilters: {};
  ordersList: IOrder[];
  filteredOrdersList: IOrder[];

  constructor(private fb: FormBuilder, private api: ApiService, private dataShareService: dataShareService, public router: Router) {
  }

  ngOnInit() {
    this.generateFilters().then(() => {
      this.filters = this.fb.group(this.fbProperties);
    });
    this.api.getOrdersList('orders').subscribe((ordersList: IOrder[]) => {
      this.ordersList = ordersList;
      this.dataShareService.shareOrdersList(ordersList);
      this.dataShareService.shareFilteredOrdersList(ordersList);
    });
    this.dataShareService.allOrders.subscribe(allOrders => {
      this.ordersList = allOrders;
      this.filterOrders();
    });
  }

  generateFilters() {
    return new Promise(resolve => {
      this.api.getFurnitureList('furniture').subscribe((furnitureList: IFurniture[]) => {
        this.furnitureList = furnitureList;
        this.dataShareService.shareFurnitureList(furnitureList);
        this.dataShareService.shareFilteredFurnitureList(furnitureList);

        this.properties = {};
        this.fbProperties = {};
        this.selectedFilters = {};
        for (let property in this.furnitureList[0]) {
          if (property === 'id' || property === 'name') {
            continue
          }
          this.properties[property] = [];
          this.fbProperties[property] = false;
          this.selectedFilters[property] = [];
        }
        this.furnitureList.forEach(furniture => {
            for (let prop in this.properties) {
              if (this.properties[prop] !== undefined)
                this.properties[prop].push(furniture[prop]);
            }
          }
        );
        for (let prop in this.properties) {
          this.properties[prop] = Array.from(new Set(this.properties[prop]))
        }
        this.propertiesArray = Object.entries(this.properties);
        resolve();
      })
    })
  }

  filterClicked(property, value) {
    if (this.selectedFilters[property].includes(value)) {
      this.selectedFilters[property].splice(this.selectedFilters[property].indexOf(value), 1);
      this.filterOrders();
      this.filterFurnitureList();
      return
    }
    this.selectedFilters[property].push(value);
    this.filterOrders();
    this.filterFurnitureList();
  }

  filterFurnitureList() {
    let accumulator = [];
    this.filteredFurnitureList = this.furnitureList;

    for (let property in this.selectedFilters) {
      this.filteredFurnitureList = this.selectedFilters[property].reduce((result, filter) => {

        result = this.filteredFurnitureList.filter(furniture => {
          return furniture[property] === filter
        });
        accumulator = accumulator.concat(result);
        return accumulator;

      }, this.filteredFurnitureList);
      accumulator = [];
    }
    this.dataShareService.shareFilteredFurnitureList(this.filteredFurnitureList);

  }

  filterOrders() {
    let accumulator = [];
    this.filteredOrdersList = this.ordersList;

    for (let property in this.selectedFilters) {
      this.filteredOrdersList = this.selectedFilters[property].reduce((result, filter) => {

        result = this.filteredOrdersList.filter(order => {
            for (let property in order.item) {
              if (order.item[property] === filter) {
                return true
              }
            }
          }
        );
        accumulator = accumulator.concat(result);
        return accumulator;

      }, this.filteredOrdersList);
      accumulator = [];
    }
    this.dataShareService.shareFilteredOrdersList(this.filteredOrdersList);
  }
}


