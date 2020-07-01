import {
	Directive,
	ViewContainerRef,
	ComponentFactoryResolver,
	Input,
	ComponentRef,
	OnInit,
	OnDestroy
} from '@angular/core';

@Directive({
	selector: '[render]'
})
export class RenderDirective implements OnInit, OnDestroy {
	@Input() readonly render: any = null;
	@Input() createIf: boolean = true;
	@Input() dataBindings: { [k: string]: any } = {};
	@Input() eventBindings: { [k: string]: Function } = {}

	public component: ComponentRef<any>;

	constructor(private vcRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {}

	ngOnInit(): void {
		this.renderComponent();
	}

	renderComponent(): void {
		if (this.vcRef && this.createIf) {
			const componentFactory = this.cfr.resolveComponentFactory(this.render);
			this.vcRef.clear();

			this.component = this.vcRef.createComponent(componentFactory);

			const bindToKeys = Object.keys(this.dataBindings);
			for (const binding of bindToKeys)
				this.component.instance[binding] = this.dataBindings[binding];

			const bindToEvents = Object.keys(this.eventBindings);
			for(const event of bindToEvents)
				this.component.instance[event].subscribe(this.eventBindings[event]);
		}
	}

	ngOnDestroy(): void {
		if (this.component) this.component.destroy();
	}
}
