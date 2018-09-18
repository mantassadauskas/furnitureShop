import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  host: string;


  constructor(public api: HttpClient) {
    // this.host = 'https://furniture-shop-heroku-api.herokuapp.com';
    this.host = 'http://localhost:3000';
  }

  getFurnitureList(url) {
    return this.api.get(`${this.host}/${url}`)
  }

  getOrdersList(url) {
    return this.api.get(`${this.host}/${url}`);
  }

  postOrder(url, order) {
    return this.api.post(`${this.host}/${url}`, order, httpOptions);
  }

  deleteOrder(url, id){
    return this.api.delete(`${this.host}/${url}/${id}`);

  }
}
