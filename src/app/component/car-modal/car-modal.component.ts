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

import Car from '../../interface/Car';
import { CarService } from '../../service/car/car.service';

@Component({
  selector: 'app-car-modal',
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
  templateUrl: './car-modal.component.html',
  styleUrl: './car-modal.component.css',
})
export class CarModalComponent {
  constructor(private carService: CarService) {}
  fb = inject(NonNullableFormBuilder);
  carForm = this.fb.group({
    maker: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(25)],
    }),
    vin: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(25)],
    }),
    model: this.fb.control('', {
      validators: [Validators.required, Validators.maxLength(25)],
    }),
    modelYear: this.fb.control('', {
      validators: [Validators.required, Validators.pattern('^[0-9]{4}$')],
    }),
    price: this.fb.control('', {
      validators: [Validators.required],
    }),
  });
  @Input() carShowroomId: number | undefined = 0;
  @Input() isVisible = false;
  @Input() modalData: Car = {
    carShowroomId: 0,
    maker: '',
    model: '',
    modelYear: '',
    price: 0,
    vin: '',
  };
  @Output() onSubmit = new EventEmitter<Car>();
  @Output() onCancel = new EventEmitter<void>();

  handleOk(): void {
    this.modalData.carShowroomId = this.carShowroomId as number;
    this.carService
      .addCarToShowroom(this.modalData)
      .subscribe((carShowroom) => {
        this.onSubmit.emit(carShowroom);
        this.modalData = {
          carShowroomId: 0,
          maker: '',
          model: '',
          modelYear: '',
          price: 0,
          vin: '',
        };
      });
  }
}
