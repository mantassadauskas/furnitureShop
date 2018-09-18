import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class dataShareService {
  private filteredFurnitureList = new BehaviorSubject([]);
  filteredFurniture = this.filteredFurnitureList.asObservable();

  private furnitureList = new BehaviorSubject([]);
  allFurniture = this.furnitureList.asObservable();

  private pagedFurnitureList = new BehaviorSubject([]);
  pagedFurniture = this.pagedFurnitureList.asObservable();

  private filteredOrdersList = new BehaviorSubject([]);
  filteredOrders = this.filteredOrdersList.asObservable();

  private ordersList = new BehaviorSubject([]);
  allOrders = this.ordersList.asObservable();

  private pagedOrdersList = new BehaviorSubject([]);
  pagedOrders = this.pagedOrdersList.asObservable();


  shareFilteredFurnitureList(searchResults) {
    this.filteredFurnitureList.next(searchResults)
  }

  shareFurnitureList(furnitureList) {
    this.furnitureList.next(furnitureList)
  }

  sharePagedFurnitureList(pagedFurniture) {
    this.pagedFurnitureList.next(pagedFurniture)
  }

  shareFilteredOrdersList(searchResults) {
    this.filteredOrdersList.next(searchResults)
  }

  shareOrdersList(furnitureList) {
    this.ordersList.next(furnitureList)
  }

  sharePagedOrdersList(pagedOrders) {
    this.pagedOrdersList.next(pagedOrders)
  }
}
