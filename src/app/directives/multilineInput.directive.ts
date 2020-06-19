import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[multiline]'
})
export class MultilineInputDirective {

  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('input') addHeight() {
    console.log(this.eleRef.nativeElement.scrollHeight);
    this.renderer.setStyle(this.eleRef.nativeElement, 'height', '1px');
    this.renderer.setStyle(this.eleRef.nativeElement, 'height', `${this.eleRef.nativeElement.scrollHeight}px`);
  }
}
