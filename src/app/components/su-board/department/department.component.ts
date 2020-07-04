import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../../../models/department.model';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';

@Component({
  selector: 'ttnd-department',
  templateUrl: './department.component.html',
  styleUrls: ['../../common.css', './department.component.css']
})
export class DepartmentComponent implements OnInit {

  @Input() data: Department = null;
  @Output() reload: EventEmitter<boolean> = new EventEmitter();

  constructor(private deptApi: DepartmentapiService) { }

  ngOnInit(): void {
  }

  deleteDept() {
    this.deptApi.deleteDeparment(this.data._id).subscribe(data => {
      this.reload.emit(true);
    }, err => {
      console.log(err);
    });
  }

}
