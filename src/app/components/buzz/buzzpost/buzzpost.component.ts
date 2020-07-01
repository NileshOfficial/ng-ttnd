import { Component, OnInit, Input } from '@angular/core';
import { BUZZ_POST, PROFILE_PIC } from '../../../config/uri.conf';
import { BuzzapiService } from 'src/app/services/apis/buzzapi.service';

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
	@Input() editable: boolean = true;

	liked: boolean = true;
	disliked: boolean = true;
	previewImages: Array<string> = [];

	postingReview: boolean = false;
	imagesModal: boolean = false;

	showEditForm: boolean = false;
	editFormData: any = null;

	constructor(private buzzApi: BuzzapiService) {}

	ngOnInit(): void {
		const images = this.data.images;
		this.data.images = images.map((image) => [BUZZ_POST, image].join('/'));
		this.previewImages = images.length >= 4 ? this.data.images.slice(0, 5) : this.data.images;

		this.data.user.picture = [PROFILE_PIC, this.data.user.picture].join('/');

		this.liked = this.data.liked;
		this.disliked = this.data.disliked;

		this.editFormData = {
			_id: this.data._id,
			title: this.data.title,
			description: this.data.description,
			category: this.data.category
		}
	}

	toggleLike() {
		this.postingReview = true;
		this.liked = !this.liked;
		if (this.liked) {
			if (this.disliked) {
				this.disliked = false;
				//update dislike -1
				this._updateReviews('dislikes', false);
				this.buzzApi.updateReview(this.data['_id'], true, 'dislike').subscribe();
			}
			//update like +1
			this._updateReviews('likes');
			this.buzzApi.updateReview(this.data['_id'], false).subscribe(
				(data) => {
					this.postingReview = false;
				},
				(err) => {
					this.postingReview = false;
				}
			);
		} else {
			//update like -1
			this._updateReviews('likes', false);
			this.buzzApi.updateReview(this.data['_id'], true).subscribe(
				(data) => {
					this.postingReview = false;
				},
				(err) => {
					this.postingReview = false;
				}
			);
		}
	}

	toggleDislike() {
		this.postingReview = true;
		this.disliked = !this.disliked;
		if (this.disliked) {
			if (this.liked) {
				this.liked = false;
				//update like -1
				this._updateReviews('likes', false);
				this.buzzApi.updateReview(this.data['_id'], true).subscribe();
			}
			//update dislike +1
			this._updateReviews('dislikes');
			this.buzzApi.updateReview(this.data['_id'], false, 'dislike').subscribe(
				(data) => {
					this.postingReview = false;
				},
				(err) => {
					this.postingReview = false;
				}
			);
		} else {
			//update dislike -1
			this._updateReviews('dislikes', false);
			this.buzzApi.updateReview(this.data['_id'], true, 'dislike').subscribe(
				(data) => {
					this.postingReview = false;
				},
				(err) => {
					this.postingReview = false;
				}
			);
		}
	}

	_updateReviews(type: string, inc: boolean = true) {
		if (inc) {
			const newPostData = { ...this.data };
			newPostData[type] += 1;
			this.data = newPostData;
		} else {
			const newPostData = { ...this.data };
			newPostData[type] -= 1;
			this.data = newPostData;
		}
	}

	showImages() {
		console.log("here");
		this.imagesModal = true;
	}

	closeImages() {
		this.imagesModal = false;
	}

	showEditPopup() {
		this.showEditForm = true;
	}

	hideEditPopup() {
		this.showEditForm = false;
	}
}
