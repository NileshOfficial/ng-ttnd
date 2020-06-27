import { Component, OnInit, Input } from '@angular/core';
import { BUZZ_POST, PROFILE_PIC } from '../../../config/uri.conf';

interface Post {
	_id: string;
	category: string;
	date: number;
	description: string;
	liked: boolean;
	likes: number;
	disliked: boolean;
	dislikes: number;
	email: string;
	images: Array<string>;
	title: string;
	user: {
		email: string;
		name: string;
		picture: string;
	};
}

@Component({
	selector: 'ttnd-buzzpost',
	templateUrl: './buzzpost.component.html',
	styleUrls: ['./buzzpost.component.css', '../../common.css']
})
export class BuzzPostComponent implements OnInit {
	@Input() data: Post;

	liked: boolean = true;
	disliked: boolean = true;
	previewImages: Array<string> = [];

	constructor() {}

	ngOnInit(): void {
		const images = this.data.images;
		this.data.images = images.map((image) => [BUZZ_POST, image].join('/'));
		this.previewImages = images.length >= 4 ? this.data.images.slice(0, 5) : this.data.images;

		this.data.user.picture = [PROFILE_PIC, this.data.user.picture].join('/');
		this.liked = this.data.liked;
    this.disliked = this.data.disliked;
  }

	toggleLike(): void {
		this.liked = !this.liked;
	}

	toggleDislike(): void {
		this.disliked = !this.disliked;
	}
}
