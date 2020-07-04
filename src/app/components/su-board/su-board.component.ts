import { Component, OnInit } from '@angular/core';
import { DepartmentComponent } from './department/department.component';
import { DepartmentapiService } from 'src/app/services/apis/departmentapi.service';

@Component({
  selector: 'ttnd-su-board',
  templateUrl: './su-board.component.html',
  styleUrls: ['../common.css', './su-board.component.css']
})
export class SuBoardComponent implements OnInit {
  readonly department = DepartmentComponent;

  constructor(public deptApi: DepartmentapiService) { }

  ngOnInit(): void {
  }

}
