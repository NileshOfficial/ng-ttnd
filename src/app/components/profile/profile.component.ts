import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'ttnd-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css', '../common.css']
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup = new FormGroup({});

  editProfile: boolean = false;

	constructor() {}

  ngOnInit(): void {}

  openEditForm(): void {
    this.editProfile = true;
  }

  closeEditForm(): void {
    this.editProfile = false;
  }
}
