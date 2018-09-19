import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap";
import {dataShareService} from "../../services/data-share.service";
import {IOrder} from "../../../assets/interfaces/Interfaces";
import {find} from "rxjs/internal/operators";
import {Observable, Subscription} from "rxjs/index";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  pageSize: number;
  page: number = 1;
  ordersList: IOrder[];
  pagedOrdersList: IOrder[];
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private dataShareService: dataShareService, private config: NgbPaginationConfig, private api: ApiService) {
    this.pageSize = 20;
    config.size = 'lg';
    config.boundaryLinks = true;
    config.pageSize = this.pageSize;
  }

  ngOnInit() {
    this.subscription = this.dataShareService.allOrders.subscribe(allOrders => {
      this.ordersList = allOrders;
    });
    this.subscription2 = this.dataShareService.pagedOrders.subscribe(pagedOrders => {
      this.pagedOrdersList = pagedOrders;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  deleteOrder(id) {
    function getOrder(id) {
      return ordersList => ordersList.id == id;
    }

    this.ordersList.splice(this.ordersList.indexOf(this.ordersList.find(getOrder(id))), 1);
    this.api.deleteOrder('orders', id).subscribe(() => {
      this.dataShareService.shareOrdersList(this.ordersList);
    });
  }
}
