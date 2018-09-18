import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap";
import {dataShareService} from "../../services/data-share.service";
import {IFurniture, IOrder} from "../../../assets/interfaces/Interfaces";
import {ApiService} from "../../services/api.service";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs/index";
import {filter} from "rxjs/internal/operators";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  pageSize: number;
  furniturePageSize: number;
  // ordersPageSize: number;
  page: number = 1;
  filteredOrdersList: IOrder[];
  pagedOrdersList: IOrder[];
  filteredFurniture: IFurniture[];
  pagedFurnitureList: IFurniture[];
  itemsCount: number;
  subscription: Subscription;
  subscription2: Subscription;
  routerSubscription: Subscription;

  constructor(private dataShareService: dataShareService, private config: NgbPaginationConfig, private api: ApiService, private router: Router) {
    this.furniturePageSize = 21;
    this.pageSize = 21;

    config.size = 'lg';
    config.boundaryLinks = true;
    config.pageSize = this.pageSize;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.page = 1;
      if (this.router.url === '/orders') {
        this.makePage();
        return
      }
      this.makePage();
    });
  }


  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  initSubscriptions() {
    this.subscription = this.dataShareService.filteredOrders.subscribe(filteredOrders => {
      this.page = 1;
      this.filteredOrdersList = filteredOrders;
      if (this.router.url === '/orders')
        this.makeOrdersPage();
    });
    this.subscription2 = this.dataShareService.filteredFurniture.subscribe(filteredFurniture => {
      this.page = 1;
      this.filteredFurniture = filteredFurniture;
      if (this.router.url === '/')
        this.makeFurniturePage();
    });
  }

  pageChange() {
    this.makePage();
    this.scrollToTop();
  }

  makePage() {
    if (this.router.url === '/orders') {
      this.makeOrdersPage();
      return
    }
    this.makeFurniturePage();
  }

  makeOrdersPage() {
    this.itemsCount = Object.keys(this.filteredOrdersList).length;
    this.pagedOrdersList = [];
    for (let i = (this.page - 1) * this.pageSize; i < this.page * this.pageSize; i++) {
      if (this.filteredOrdersList[i] === undefined) {
        this.dataShareService.sharePagedOrdersList(this.pagedOrdersList);
        return
      }
      this.pagedOrdersList.push(this.filteredOrdersList[i]);
    }
    this.dataShareService.sharePagedOrdersList(this.pagedOrdersList);
  }

  makeFurniturePage() {
    this.pageSize = this.furniturePageSize;
    this.itemsCount = Object.keys(this.filteredFurniture).length;
    this.pagedFurnitureList = [];
    for (let i = (this.page - 1) * this.pageSize; i < this.page * this.pageSize; i++) {

      if (this.filteredFurniture[i] === undefined) {
        this.dataShareService.sharePagedFurnitureList(this.pagedFurnitureList);
        return
      }
      this.pagedFurnitureList.push(this.filteredFurniture[i]);
    }
    this.dataShareService.sharePagedFurnitureList(this.pagedFurnitureList);
  }

  scrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 80); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
