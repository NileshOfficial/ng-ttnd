import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ttnd-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['../../common.css', './confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Input() show: boolean = true;
  @Input() message: string = '';
  @Output() decision: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  proceed(decision: boolean) {
    this.show = false;
    this.decision.emit(decision);
  }

}
