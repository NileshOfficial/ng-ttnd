import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ttnd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../../common.css']
})
export class ModalComponent {

  @Input() showUp: boolean = true;
  @Input() close: Function = null;

  hideModal() {
    this.showUp = false;
    this.close();
  }

}
