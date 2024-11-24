import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.me().subscribe((res) => {
      console.log(res.data);
      this.userInfo = res.data;
    });
  }
}
