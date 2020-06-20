import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttnd-comments-section',
  templateUrl: './commentsSection.component.html',
  styleUrls: ['./commentsSection.component.css', '../../common.css']
})
export class CommentsSectionComponent implements OnInit {

  replySelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  discardReplySelected(): void {
    setTimeout(() => {
      this.replySelected = !this.replySelected;
    }, 100);
  }

}
