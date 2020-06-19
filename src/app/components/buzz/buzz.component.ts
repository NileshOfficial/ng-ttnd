import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttnd-buzz',
  templateUrl: './buzz.component.html',
  styleUrls: ['./buzz.component.css', '../common.css']
})
export class BuzzComponent implements OnInit {

  createBuzz: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openBuzzForm() {
    this.createBuzz = true;
  }

  closeBuzzForm() {
    this.createBuzz = false;
  }

}
