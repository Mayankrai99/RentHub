import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  loggedInUser: string | null = null;
  private platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedInUser = localStorage.getItem('token');
    }
  }

  loggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedInUser = localStorage.getItem('token');
    }
    return this.loggedInUser;
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }
}
