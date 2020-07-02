import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttnd-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css', '../../common.css']
})
export class ComplaintComponent implements OnInit {

  editableBy: string = 'user'; /* admin, user, view */

  constructor() { }

  ngOnInit(): void {
  }

}
