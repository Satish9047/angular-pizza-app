import { Component, OnInit } from '@angular/core';

import { Orders } from '../../../core/interfaces/order';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-your-orders',
  standalone: true,
  imports: [],
  templateUrl: './your-orders.component.html',
  styleUrl: './your-orders.component.css',
})
export class YourOrdersComponent implements OnInit {
  yourOrders: Orders[] | null = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe((response) => {
      this.yourOrders = response.data;
      console.log(response);
    });
  }
}
