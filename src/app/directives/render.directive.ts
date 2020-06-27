import {
	Directive,
	ViewContainerRef,
	ComponentFactoryResolver,
	Input,
	ComponentRef,
	OnInit,
	OnDestroy,
  Component
} from '@angular/core';

@Directive({
	selector: '[render]'
})
export class RenderDirective implements OnInit, OnDestroy {
	@Input() readonly render: any = null;
	@Input() data: any = null;

	public component: ComponentRef<any>;
	constructor(private vcRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {}

	ngOnInit(): void {
		console.log(this.data);
		this.renderComponent();
	}

	renderComponent(): void {
		if (this.vcRef) {
			const componentFactory = this.cfr.resolveComponentFactory(this.render);
			this.vcRef.clear();

			this.component = this.vcRef.createComponent(componentFactory);
			this.component.instance.data = this.data;
		}
	}

	ngOnDestroy(): void {
		if (this.component) this.component.destroy();
	}
}
