import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttnd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../common.css']
})
export class NavComponent implements OnInit {
  personalNotes: Array<string> = ["notes 1", "notes 2", "notes 3"];

  constructor() { }

  ngOnInit(): void {
  }

}
