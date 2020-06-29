import { Component, OnInit } from '@angular/core';
import { BuzzapiService } from '../../services/apis/buzzapi.service';
import { BuzzPostComponent } from './buzzpost/buzzpost.component';

@Component({
	selector: 'ttnd-buzz',
	templateUrl: './buzz.component.html',
	styleUrls: ['./buzz.component.css', '../common.css']
})
export class BuzzComponent implements OnInit {

	readonly buzzPostComponent = BuzzPostComponent;

	constructor(public api: BuzzapiService) {}

	ngOnInit(): void {}
}
