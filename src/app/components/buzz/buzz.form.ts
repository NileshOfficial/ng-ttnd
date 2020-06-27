import { FormGroup, FormControl, Validators } from '@angular/forms';

const categories = ['activity', 'lost and found'];

function verifyCategory(category: FormControl): { [k: string]: boolean } {
	if (categories.includes(category.value)) return null;
	else return { invalidCategory: true };
}

export const buzzForm = new FormGroup({
	'category': new FormControl('', [Validators.required, verifyCategory]),
	'description': new FormControl(null, [Validators.required]),
	'title': new FormControl(null)
});
