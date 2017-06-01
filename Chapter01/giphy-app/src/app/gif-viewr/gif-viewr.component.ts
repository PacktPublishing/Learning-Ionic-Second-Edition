import { Component, OnInit, Input} from '@angular/core';

@Component({
	selector: 'app-gif-viewr',
	templateUrl: './gif-viewr.component.html',
	styleUrls: ['./gif-viewr.component.css']
})
export class GifViewrComponent implements OnInit {
	@Input() imgUrl: string;

	constructor() { }

	ngOnInit() {
	}
}
