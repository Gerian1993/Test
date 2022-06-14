import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

import houses from '../file/houses.json';
import apartments from '../file/apartments.json';
import persons from '../file/persons.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {


  houseList: [{ name: String; id: number }] = houses;
  apartmentsList: [{ name: String; id: number; hid: number }] = apartments;
  personsList: [{ name: String; id: number; aid: number }] = persons;

  houseOption: string = '';
  apartmentOption: string = '';
  personOption: string = '';

  rooms: any = [];
  persons: any = [];

  result: any = [];

  onChangeHouse() {
    this.apartmentOption = '';
    this.personOption = '';

    houses.forEach((item: any) => {
      if (this.houseOption === item.name) {
        let array: any = [];
        apartments.forEach((element: any) => {
          if (item.id === element.hid) {
            array.push(this.houseOption + ' ' + element.name);
            this.rooms = array;
          }
        });
      }
    });
  }

  onChangeApartment() {
    this.personOption = '';
    houses.forEach((building: any) => {
      apartments.forEach((item: any) => {
        if (building.id === item.hid && this.houseOption === building.name) {
          let array: any = [];
          persons.forEach((element: any) => {
            if (
              item.id === element.aid &&
              this.apartmentOption === this.houseOption + ' ' + item.name
            ) {
              array.push(element.name);
              this.persons = array;
            }
          });
        }
      });
    });
  }

  onClick() {
    let data: string =
      '{house: ' +
      this.houseOption +
      ', apartment: ' +
      this.apartmentOption.slice(-5) +
      ', person: ' +
      this.personOption +
      '}';
    this.result.push(data);
  }
}
