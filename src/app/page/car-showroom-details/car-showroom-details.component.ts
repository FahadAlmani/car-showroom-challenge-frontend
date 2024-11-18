import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CarActionBarComponent } from '../../component/car-action-bar/car-action-bar.component';
import { CarModalComponent } from '../../component/car-modal/car-modal.component';
import Car from '../../interface/Car';
import CarShowroom from '../../interface/CarShowroom';
import Pagination from '../../interface/Pagination ';
import { CarService } from '../../service/car/car.service';
import { CarShowroomService } from '../../service/carShowroomService/car-showroom-service.service';

@Component({
  selector: 'app-car-showroom-details',
  standalone: true,
  imports: [
    NzGridModule,
    FormsModule,
    NzDividerModule,
    NzInputModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzTableModule,
    NzSelectModule,
    CommonModule,
    CarActionBarComponent,
    NzButtonModule,
    NzPaginationModule,
    CarModalComponent,
  ],
  templateUrl: './car-showroom-details.component.html',
  styleUrl: './car-showroom-details.component.css',
})
export class CarShowroomDetailsComponent implements OnInit {
  dataSet: Car[] = [];
  filterBy = 'none';
  filterValue = 'none';
  carPage: Pagination<Car> = {
    content: [],
    number: 0,
    numberOfElement: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0,
  };
  data: CarShowroom = {
    address: '',
    commercialRegistrationNumber: '',
    contactNumber: '',
    managerName: '',
    name: '',
  };
  modalData: Car = {
    carShowroomId: this.data.id as number,
    maker: '',
    model: '',
    modelYear: '',
    price: 0,
    vin: '',
  };
  isVisible = false;
  constructor(
    private carShowroomService: CarShowroomService,
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const carShowroomId: number = parseInt(
      this.route.snapshot.paramMap.get('id') as string
    );
    this.carShowroomService
      .getCarShowroomById(carShowroomId)
      .subscribe((carShowroom) => (this.data = carShowroom));

    this.getAllCarOfShowroom(carShowroomId);
  }

  getAllCarOfShowroom(carShowroomId: number) {
    this.carService
      .getAllCarByShowroomId(
        carShowroomId,
        this.carPage.number,
        this.carPage.size,
        this.filterBy,
        this.filterValue
      )
      .subscribe((car) => {
        this.carPage = car;
        this.dataSet = [...car.content];
      });
  }

  changePage(pageNumber: number) {
    this.carPage.number = pageNumber - 1;
    this.getAllCarOfShowroom(this.data.id as number);
  }

  changePageSize(pageSize: number) {
    this.carPage.size = pageSize;
    this.getAllCarOfShowroom(this.data.id as number);
  }

  changeSortedBy(filter: { filterBy: string; value: string }) {
    this.filterBy = filter.filterBy;
    this.filterValue = filter.value;
    this.getAllCarOfShowroom(this.data.id as number);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modalData = {
      carShowroomId: this.data.id as number,
      maker: '',
      model: '',
      modelYear: '',
      price: 0,
      vin: '',
    };
  }

  onSubmit(car: Car) {
    this.addCar(car);
  }

  addCar(car: Car) {
    this.isVisible = false;
    if (this.dataSet.length < this.carPage.size) {
      this.dataSet = [...this.dataSet, { ...car }];
    }
    this.carPage.totalElements++;
    this.carPage.totalPages = Math.ceil(
      this.carPage.totalElements / this.carPage.size
    );
  }
}
