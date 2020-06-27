import { Component, OnInit, Input, Type } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'ttnd-infinite',
	templateUrl: './infiniteScroller.component.html',
	styleUrls: ['./infiniteScroller.component.css']
})
export class InfiniteScrollerComponent implements OnInit {
	@Input() repeat: Type<unknown>;
	@Input() dataService: any;
	@Input() subscribeToArgs: any = {};
	@Input() limit: number = 0;

	private subscription: Subscription = null;

	showLoader: boolean = true;
	data: Array<any> = [];
	stopScrolling: boolean = false;
	skip: number = 0;

	constructor() {}

	ngOnInit(): void {
		this.onScroll();
	}

	onScroll(): void {
		if (!this.subscription && !this.stopScrolling) {
			this.showLoader = true;
			this.dataService.get(this.subscribeToArgs, this.skip, this.limit).subscribe(
				(data) => {
					console.log(data);
					this.showLoader = false;
					this.data.push(...data);
					this.skip += this.limit;

					if (data.length === 0) this.stopScrolling = true;
					else if (data.length < this.limit) this.stopScrolling = true;
				},
				(err) => {
					console.log(err);
					this.showLoader = false;
				}
			);
		}
	}
}
