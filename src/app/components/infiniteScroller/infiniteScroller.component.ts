import { Component, OnInit, Input, Type } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'ttnd-infinite',
	templateUrl: './infiniteScroller.component.html',
	styleUrls: ['./infiniteScroller.component.css']
})
export class InfiniteScrollerComponent implements OnInit {
	@Input() repeat: Type<unknown>;
	@Input() subscribeTo: (...args: any) => Observable<any>;
	@Input() subscribeToArgs: Array<any> = [];
	@Input() limit: number = 0;

	private subscription: Subscription = null;

	showLoader: boolean = true;
	data: Array<any> = [1, 2, 3, 4, 5];
	stopScrolling: boolean = false;
	skip: number = 0;

	constructor() {}

	ngOnInit(): void {}

	onScroll(): void {
		if (!this.subscription && !this.stopScrolling) {
			this.showLoader = true;
			this.subscribeTo(...this.subscribeToArgs, this.skip, this.limit).subscribe(
				(data) => {
					this.showLoader = false;
					this.data.push(...data);
					this.skip += this.limit;

					if (data.length === 0) this.stopScrolling = true;
					else if (data.length < this.limit) this.stopScrolling = true;
				},
				(err) => {
					this.showLoader = false;
				}
			);
		}
	}
}
