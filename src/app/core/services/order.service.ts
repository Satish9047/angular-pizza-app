import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

import { config } from '../constant/baseApiUrl';
import { ApiResponse } from '../interfaces/auth';
import { handleError } from '../utils/ErrorHandler';
import { CreateOrderResponse, Orders, PlaceOrder } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getUserOrders() {
    return this.http
      .get<ApiResponse<Orders[]>>(`${config.baseUrl}/order/user`)
      .pipe(catchError((error) => handleError(error)));
  }

  getAllOrders() {
    return this.http
      .get<ApiResponse<Orders>>(`${config.baseUrl}/order`)
      .pipe(catchError((error) => handleError(error)));
  }

  placeOrder(orderInfo: PlaceOrder) {
    return this.http
      .post<
        ApiResponse<CreateOrderResponse>
      >(`${config.baseUrl}/order`, orderInfo)
      .pipe(catchError((error) => handleError(error)));
  }

  updateToDelivered(orderId: string) {
    return this.http
      .put<
        ApiResponse<CreateOrderResponse>
      >(`${config.baseUrl}/order/${orderId}`, {})
      .pipe(catchError((error) => handleError(error)));
  }

  updateToPaid(orderId: string) {
    return this.http
      .put<
        ApiResponse<CreateOrderResponse>
      >(`${config.baseUrl}/order/paid/${orderId}`, {})
      .pipe(catchError((error) => handleError(error)));
  }
}
