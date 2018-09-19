import {Component, OnDestroy, OnInit} from '@angular/core';
import {dataShareService} from "../../services/data-share.service";
import {NgbPaginationConfig} from "@ng-bootstrap/ng-bootstrap";
import {ApiService} from "../../services/api.service";
import {OrderModule} from "../../Models/order/order.module";
import {IFurniture, IOrder} from "../../../assets/interfaces/Interfaces";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.scss']
})
export class FurnitureListComponent implements OnInit, OnDestroy {
  pagedFurnitureList: IFurniture[];
  subscription: Subscription;

  constructor(private dataShareService: dataShareService, private config: NgbPaginationConfig, private api: ApiService) {

  }

  ngOnInit() {
    this.subscription = this.dataShareService.pagedFurniture.subscribe(pagedFurniture => {
      this.pagedFurnitureList = pagedFurniture;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  makeOrder(furniture) {
    this.api.postOrder('orders', new OrderModule(furniture)).subscribe(() => {
      this.api.getOrdersList('orders').subscribe(
        (ordersList: IOrder) => {
          this.dataShareService.shareOrdersList(ordersList);
        })
    });

  }
}
