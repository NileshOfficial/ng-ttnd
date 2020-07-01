import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ttnd-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css', '../common.css']
})
export class ComplaintsComponent implements OnInit {

  complaintForm: FormGroup = null;
  constructor() { }

  ngOnInit(): void {
    this.complaintForm = new FormGroup({

    });
  }

}
