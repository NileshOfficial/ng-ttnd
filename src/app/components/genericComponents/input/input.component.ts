import { Component, OnChanges, Input, ContentChild, ElementRef, Renderer2, SimpleChanges, AfterContentChecked } from '@angular/core';
import { TextFieldDirective } from '../../../directives/textField.directive';

@Component({
  selector: 'ttnd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @ContentChild(TextFieldDirective, { static: true }) input: ElementRef;
  @Input() label: string = "";
  @Input() message: string = "";
  @Input() error: boolean = false;

  constructor() { }

}
