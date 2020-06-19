import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttnd-buzzpost',
  templateUrl: './buzzpost.component.html',
  styleUrls: ['./buzzpost.component.css', '../../common.css']
})
export class BuzzPostComponent implements OnInit {

  liked: boolean = true;
  disliked: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleLike(): void {
    this.liked = !this.liked;
  }
  
  toggleDislike(): void {
    this.disliked = !this.disliked;
  }

}
