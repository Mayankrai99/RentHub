import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../../services/housing.service';
import { Property } from '../../../common/property';
import { IPropertyBase } from '../../../common/IPropertyBase';

@Component({
  selector: 'app-view-property-details',
  templateUrl: './view-property-details.component.html',
  styleUrls: ['./view-property-details.component.css'],
})
export class ViewPropertyDetailsComponent implements OnInit {
  public propertyId!: number;

  property = new Property();

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.params['id'];

    this.route.params.subscribe((params) => {
      this.propertyId = +params['id'];
      this.housingService
        .getPropertyById(this.propertyId)
        .subscribe((res: IPropertyBase | undefined) => {
          if (res) {
            this.property = res as Property;
          } else {
            // Handle the case where the property is not found or is undefined
            console.error('Property not found');
          }
        });
    });
  }
}
