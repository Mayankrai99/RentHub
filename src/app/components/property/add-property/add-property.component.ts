import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from '../../../common/IProperty';
import { Property } from '../../../common/property';
import { HousingService } from '../../../services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm: NgForm | undefined;
  @ViewChild('formTabs') formTabs!: TabsetComponent;

  property = new Property();

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  propertyPreView: IProperty = {
    id: 0,
    name: '',
    propertyType: '',
    price: null,
    security: null,
    maintenance: null,
    builtArea: null,
    carpetArea: null,
    floor: null,
    totalFloor: null,
    city: '',
    address: '',
    landmark: '',
    readyToMove: true,
    possessionDate: null,
    ageOfProperty: null,
    gatedCommunity: 0,
    Description: '',
    image: '',
    fType: '',
    bhk: 0,
  };

  constructor(private router: Router, private housingService: HousingService) {}

  ngOnInit() {}

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.addPropertyForm?.valid) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      alert('Submitted');
      console.log(this.addPropertyForm);
      this.router.navigate(['/']);
    } else {
      this.markAllAsTouched();
      alert('Not submitted');
    }
  }

  mapProperty() {
    this.property.id = this.housingService.newPropertyId();
    this.property.propertyType =
      this.addPropertyForm?.form.value.basicInfo.propType;
    this.property.bhk = this.addPropertyForm?.form.value.basicInfo.bhk;
    this.property.fType = this.addPropertyForm?.form.value.basicInfo.fType;
    this.property.name = this.addPropertyForm?.form.value.basicInfo.name;
    this.property.city = this.addPropertyForm?.form.value.basicInfo.city;
    this.property.price = this.addPropertyForm?.form.value.priceAreaInfo.price;
    this.property.security =
      this.addPropertyForm?.form.value.priceAreaInfo.security;
    this.property.maintenance =
      this.addPropertyForm?.form.value.priceAreaInfo.maintenance;
    this.property.builtArea =
      this.addPropertyForm?.form.value.priceAreaInfo.builtArea;
    this.property.carpetArea =
      this.addPropertyForm?.form.value.priceAreaInfo.carpetArea;
    this.property.floor = this.addPropertyForm?.form.value.AddressInfo.floor;
    this.property.totalFloor =
      this.addPropertyForm?.form.value.AddressInfo.totalFloor;
    this.property.address =
      this.addPropertyForm?.form.value.AddressInfo.address;
    this.property.landmark =
      this.addPropertyForm?.form.value.AddressInfo.landmark;
    this.property.readyToMove =
      this.addPropertyForm?.form.value.otherInfo.readyToMove;
    this.property.possessionDate =
      this.addPropertyForm?.form.value.otherInfo.possessionDate;
    this.property.ageOfProperty =
      this.addPropertyForm?.form.value.otherInfo.ageOfProperty;
    this.property.gatedCommunity =
      this.addPropertyForm?.form.value.otherInfo.gatedCommunity;
    this.property.description =
      this.addPropertyForm?.form.value.otherInfo.description;
    this.property.image = this.addPropertyForm?.value.image;
    this.property.postedOn = new Date().toString();
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

  validateAndNavigate(tabId: number) {
    const currentTab = this.formTabs.tabs[tabId - 1];
    const formGroup = this.addPropertyForm?.form.get(
      currentTab?.id as string
    ) as FormGroup;

    if (formGroup) {
      Object.keys(formGroup.controls).forEach((key) => {
        const control = formGroup.controls[key];
        if (control) {
          control.markAsTouched();
        }
      });

      if (formGroup.valid) {
        this.selectTab(tabId);
      }
    }
  }

  private markAllAsTouched() {
    if (this.addPropertyForm) {
      Object.keys(this.addPropertyForm.controls).forEach((key) => {
        const control = this.addPropertyForm?.controls[key];
        if (control) {
          control.markAsTouched();
          if (control instanceof FormGroup) {
            this.markGroupAsTouched(control);
          }
        }
      });
    }
  }

  private markGroupAsTouched(group: FormGroup) {
    Object.keys(group.controls).forEach((key) => {
      const control = group.controls[key];
      if (control) {
        control.markAsTouched();
        if (control instanceof FormGroup) {
          this.markGroupAsTouched(control);
        }
      }
    });
  }
}
