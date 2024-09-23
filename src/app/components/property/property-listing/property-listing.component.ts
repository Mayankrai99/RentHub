import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IPropertyBase } from '../../../common/IPropertyBase';
import { HousingService } from '../../../services/housing.service';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css'],
})
export class PropertyListingComponent implements OnInit {
  [x: string]: any;
  Properties: IPropertyBase[] = []; // Initialize as an empty array
  city = '';
  SearchCity = '';
  private isBrowser: boolean;
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(
    private housingService: HousingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.housingService.getAllProperties().subscribe(
      (response: IPropertyBase[]) => {
        this.Properties = response;
      },
      (error) => console.log(error)
    );
  }

  onCityFilter() {
    this.SearchCity = this.city;
  }

  onCityFilterReset() {
    this.city = '';
    this.SearchCity = '';
  }

  onSortDirection() {
    this.SortDirection = this.SortDirection === 'desc' ? 'asc' : 'desc';
  }
}
