import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

import CarShowroom from '../../interface/CarShowroom';
import { CarShowroomService } from '../../service/carShowroomService/car-showroom-service.service';

@Component({
  selector: 'app-car-showroom-modal',
  standalone: true,
  imports: [
    NzModalModule,
    CommonModule,
    FormsModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './car-showroom-modal.component.html',
  styleUrl: './car-showroom-modal.component.css',
})
export class CarShowroomModalComponent {
  fb = inject(NonNullableFormBuilder);
  carShowroomForm = this.fb.group({
    name: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    commercialRegistrationNumber: this.fb.control('', {
      validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
    }),
    managerName: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    contactNumber: this.fb.control('', {
      validators: [Validators.required, Validators.pattern('^[0-9]{1,15}$')],
    }),
    address: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(255)],
    }),
  });
  constructor(private carShowroomService: CarShowroomService) {}
  @Input() isVisible = false;
  @Input() modalMode = '';
  @Input() modalData: CarShowroom = {
    name: '',
    commercialRegistrationNumber: '',
    managerName: '',
    contactNumber: '',
    address: '',
  };
  @Output() onSubmit = new EventEmitter<CarShowroom>();
  @Output() onCancel = new EventEmitter<void>();

  handleOk(): void {
    if (this.modalMode == 'Create') {
      this.carShowroomService
        .addCarShowroom(this.modalData)
        .subscribe((carShowroom) => {
          this.onSubmit.emit(carShowroom);
          this.modalData = {
            name: '',
            commercialRegistrationNumber: '',
            managerName: '',
            contactNumber: '',
            address: '',
          };
        });
    } else {
      this.carShowroomService
        .updateCarShowroom(this.modalData)
        .subscribe((carShowroom) => {
          this.onSubmit.emit(carShowroom);
          this.modalData = {
            name: '',
            commercialRegistrationNumber: '',
            managerName: '',
            contactNumber: '',
            address: '',
          };
        });
    }
  }
}
