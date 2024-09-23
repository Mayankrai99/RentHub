import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IPropertyBase } from '../common/IPropertyBase';
import { Property } from '../common/property';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<IPropertyBase[]> {
    return this.http.get<IPropertyBase[]>('assets/data/properties.json').pipe(
      map((res) => {
        const propertiesList: Array<IPropertyBase> = [];

        // Check if localStorage is available
        if (
          typeof window !== 'undefined' &&
          typeof localStorage !== 'undefined'
        ) {
          let localAddedProperties: { [key: string]: IPropertyBase } = {};
          try {
            const storedData = localStorage.getItem('newProperty');
            if (storedData) {
              localAddedProperties = JSON.parse(storedData);
            }
          } catch (error) {
            console.error('Error parsing local storage data', error);
          }

          // Add local properties to the list
          for (const id in localAddedProperties) {
            if (localAddedProperties.hasOwnProperty(id)) {
              propertiesList.push(localAddedProperties[id]);
            }
          }
        }

        // Add properties from the HTTP response to the list
        for (const id in res) {
          if (res.hasOwnProperty(id)) {
            propertiesList.push(res[id]);
          }
        }

        return propertiesList;
      })
    );
  }

  addProperty(property: Property) {
    let newProperty: Property[];

    const existingProperties = localStorage.getItem('newProperty');
    if (existingProperties) {
      newProperty = [property, ...JSON.parse(existingProperties)];
    } else {
      newProperty = [property];
    }

    localStorage.setItem('newProperty', JSON.stringify(newProperty));
  }

  newPropertyId(): number {
    const pid = localStorage.getItem('PID');
    if (pid) {
      // Ensure 'pid' is not null and is a valid number
      const newId = Number(pid) + 1;
      localStorage.setItem('PID', String(newId));
      return newId;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  getPropertyById(id: number) {
    return this.getAllProperties().pipe(
      map((prop) => {
        return prop.find((p) => p.id === id);
      })
    );
  }
}
