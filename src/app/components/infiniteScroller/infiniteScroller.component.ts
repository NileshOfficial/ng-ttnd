import { Component, OnInit, Input, Type, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'ttnd-infinite',
	templateUrl: './infiniteScroller.component.html',
	styleUrls: ['./infiniteScroller.component.css', '../common.css']
})
export class InfiniteScrollerComponent implements OnInit, OnChanges {
	@Input() repeat: Type<unknown>;
	@Input() dataService: any;
	@Input() dataBindings: { [k: string]: any } = {};
	@Input() eventBindings: { [k: string]: Function } = {};
	@Input() subscribeToArgs: any = {};
	@Input() limit: number = 0;

	private subscription: Subscription = null;

	showLoader: boolean = true;
	err: boolean = false;
	data: Array<any> = [];
	stopScrolling: boolean = false;
	skip: number = 0;

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes.subscribeToArgs && !changes.subscribeToArgs.firstChange)
			this.reload();
	}

	ngOnInit(): void {
		this.onScroll();
	}

	onScroll(): void {
		if (!this.subscription && !this.stopScrolling) {
			this.showLoader = true;
			this.dataService.get(this.subscribeToArgs, this.skip, this.limit).subscribe(
				(data) => {
					this.showLoader = false;
					this.data.push(...data);
					this.skip += this.limit;

					if (data.length === 0) this.stopScrolling = true;
					else if (data.length < this.limit) this.stopScrolling = true;
				},
				(err) => {
					console.log(err);
					this.err = true;
					this.showLoader = false;
				}
			);
		}
	}

	reload() {
		this.data = [];
		this.skip = 0;
		this.stopScrolling = false;
		this.subscription = null;
		this.onScroll();
	}

	getDataBindings(data: any) {
		this.dataBindings.data = data;
		return this.dataBindings;
	}

	getEventBindings() {
		this.eventBindings.reload = this.reload.bind(this);
		return this.eventBindings;
	}
}
