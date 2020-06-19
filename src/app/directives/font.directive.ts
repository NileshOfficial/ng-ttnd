import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[defaultFont]'
})
export class FontDirective implements OnInit{
  @Input() defualtFont: string = "'Roboto', sans-serif";
  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.eleRef.nativeElement, 'font-family', this.defualtFont);
  }
}
