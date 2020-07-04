import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'ttnd-department',
  templateUrl: './department.component.html',
  styleUrls: ['../../common.css', './department.component.css']
})
export class DepartmentComponent implements OnInit {

  @Input() data: Department = null;
  @Output() reload: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
