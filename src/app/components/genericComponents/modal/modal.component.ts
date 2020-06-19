import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tasks-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() showUp: boolean = false;
  @Output() showUpChanged: EventEmitter<boolean> = new EventEmitter();

  hideModal() {
    this.showUpChanged.emit(false);
  }

}
