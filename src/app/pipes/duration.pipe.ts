import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration'
})
export class DurationPipe implements PipeTransform {
	limit = [60, 3600, 86400, 604800];
	durationType = ['min', 'h', 'd', 'w', 'm', 'y'];

	transform(value: number): string {
		let seconds = (Date.now() - value) / 1000;
		let duration = 'now';
		let durationQty: number = 0;

		if (seconds > this.limit[3]) {
			const createdOn = new Date(value);
			const date = createdOn.getDate();
			const month = createdOn.toLocaleString('default', { month: 'long' });
			const year = createdOn.getFullYear();

			return year !== new Date().getFullYear() ? `${month} ${date}, ${year}` : `${month} ${date}`;
		}

		for (let idx = 0; idx < this.limit.length - 1; idx++) {
			if (seconds > this.limit[idx] && seconds < this.limit[idx + 1]) {
				durationQty = seconds / this.limit[idx];
				duration = this.durationType[idx];
				break;
			}
		}
		return duration === 'now' ? duration : `${Math.floor(durationQty)}${duration} ago`;
	}
}
