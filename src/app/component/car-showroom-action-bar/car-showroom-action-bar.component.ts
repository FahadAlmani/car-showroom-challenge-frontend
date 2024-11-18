import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import CarShowroom from '../../interface/CarShowroom';
import Pagination from '../../interface/Pagination ';

@Component({
  selector: 'app-car-showroom-action-bar',
  standalone: true,
  imports: [NzButtonModule, NzSelectModule, FormsModule, NzDividerModule],
  templateUrl: './car-showroom-action-bar.component.html',
  styleUrl: './car-showroom-action-bar.component.css',
})
export class CarShowroomActionBarComponent {
  @Input() carShowroomPage: Pagination<CarShowroom> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    numberOfElement: 0,
  };
  @Input() sortedBy: string = 'id';
  @Output() onchangePageSize: EventEmitter<number> = new EventEmitter();
  @Output() onopenCreateModal: EventEmitter<void> = new EventEmitter();
  @Output() onchangeSortedBy: EventEmitter<string> = new EventEmitter();
}
