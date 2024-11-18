import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CarShowroomActionBarComponent } from '../../component/car-showroom-action-bar/car-showroom-action-bar.component';
import { CarShowroomModalComponent } from '../../component/car-showroom-modal/car-showroom-modal.component';
import CarShowroom from '../../interface/CarShowroom';
import Pagination from '../../interface/Pagination ';
import { CarShowroomService } from '../../service/carShowroomService/car-showroom-service.service';

@Component({
  selector: 'app-car-showroom-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzModalModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzPaginationModule,
    NzTableModule,
    NzPopconfirmModule,
    CarShowroomActionBarComponent,
    CarShowroomModalComponent,
    CarShowroomManagementComponent,
  ],
  templateUrl: './car-showroom-management.component.html',
  styleUrl: './car-showroom-management.component.css',
})
export class CarShowroomManagementComponent {
  constructor(
    private carShowroomService: CarShowroomService,
    private router: Router
  ) {}
  modalMode = '';
  dataSet: CarShowroom[] = [];

  sortedBy = 'id';
  pageNumber = 1;
  isVisible = false;
  modalData: CarShowroom = {
    name: '',
    commercialRegistrationNumber: '',
    managerName: '',
    contactNumber: '',
    address: '',
  };

  openCreateModal(): void {
    this.modalMode = 'Create';
    this.isVisible = true;
  }

  openViewModal(carShowroom: CarShowroom): void {
    this.router.navigateByUrl('car-showroom-details/' + carShowroom.id);
  }

  openUpdateModal(carShowroom: CarShowroom): void {
    this.modalMode = 'Update';
    this.isVisible = true;
    this.carShowroomService
      .getCarShowroomById(carShowroom.id)
      .subscribe((carShowroom) => (this.modalData = carShowroom));
  }

  carShowroomPage: Pagination<CarShowroom> = {
    content: [],
    number: 0,
    numberOfElement: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0,
  };

  changePageSize(pageSize: number) {
    this.carShowroomPage.size = pageSize;
    this.getAllCarShowroomWithPagination();
  }

  changeSortedBy(sortedBy: string) {
    this.sortedBy = sortedBy;
    this.getAllCarShowroomWithPagination();
  }

  changePage(pageNumber: number) {
    this.carShowroomPage.number = pageNumber - 1;
    this.getAllCarShowroomWithPagination();
  }

  getAllCarShowroomWithPagination() {
    this.carShowroomService
      .getAllCarShowroom(
        this.carShowroomPage.number,
        this.carShowroomPage.size,
        this.sortedBy
      )
      .subscribe((carShowroomPage) => {
        this.carShowroomPage = carShowroomPage;
        this.dataSet = carShowroomPage.content;
      });
  }

  ngOnInit(): void {
    this.getAllCarShowroomWithPagination();
  }

  confirm(carShowroomId?: number) {
    this.carShowroomService
      .deleteCarShowroom(carShowroomId)
      .subscribe((deletedShowroom: CarShowroom) => {
        this.dataSet = this.dataSet.filter(
          (showroom) => showroom.id !== deletedShowroom.id
        );
      });
  }

  onSubmit(carShowroom: CarShowroom) {
    if (this.modalMode == 'Create') {
      this.addCarShowroom(carShowroom);
    } else {
      this.updateCarShowroom(carShowroom);
    }
  }

  addCarShowroom(carShowroom: CarShowroom) {
    this.isVisible = false;
    if (this.dataSet.length < this.carShowroomPage.size) {
      this.dataSet = [...this.dataSet, { ...carShowroom }];
    }
    this.carShowroomPage.totalElements++;
    this.carShowroomPage.totalPages = Math.ceil(
      this.carShowroomPage.totalElements / this.carShowroomPage.size
    );
  }
  updateCarShowroom(updatedCarShowroom: CarShowroom) {
    this.isVisible = false;

    const index = this.dataSet.findIndex(
      (carShowroom) => carShowroom.id == updatedCarShowroom.id
    );

    this.dataSet[index] = updatedCarShowroom;
    this.dataSet = [...this.dataSet];
  }
  handleCancel(): void {
    this.isVisible = false;
    this.modalData = {
      name: '',
      commercialRegistrationNumber: '',
      managerName: '',
      contactNumber: '',
      address: '',
    };
  }
}
