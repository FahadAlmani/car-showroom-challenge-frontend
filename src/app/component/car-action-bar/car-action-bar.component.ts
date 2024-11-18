import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import Car from '../../interface/Car';
import Pagination from '../../interface/Pagination ';

@Component({
  selector: 'app-car-action-bar',
  standalone: true,
  imports: [
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    NzDividerModule,
    NzInputModule,
  ],
  templateUrl: './car-action-bar.component.html',
  styleUrl: './car-action-bar.component.css',
})
export class CarActionBarComponent {
  value: string = '';
  @Input() carPage: Pagination<Car> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 5,
    number: 0,
    numberOfElement: 0,
  };
  @Input() filterBy: string = 'none';
  @Output() onchangePageSize: EventEmitter<number> = new EventEmitter();
  @Output() onopenCreateModal: EventEmitter<void> = new EventEmitter();
  @Output() applyFilter: EventEmitter<{ filterBy: string; value: string }> =
    new EventEmitter();
}
