import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[textField]'
})
export class TextFieldDirective implements AfterViewInit {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.renderer.setProperty(this.element.nativeElement, 'placeholder', ' ');
  }

}
