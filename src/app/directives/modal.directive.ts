import { Directive, Input, ViewContainerRef, TemplateRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
	selector: '[modal]'
})
export class ModalDirective {
	@Input() set modal(predicate: boolean) {
		if (predicate) this.vcRef.createEmbeddedView(this.templateRef);
		else this.vcRef.clear();
	}

	@HostBinding('class.overlay.fullscreen') classes: boolean = true;

	constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}
}
