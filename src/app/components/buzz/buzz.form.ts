import { FormGroup, FormControl, Validators } from '@angular/forms';

const categories = ['activity', 'lost and found'];

function verifyCategory(category: FormControl): { [k: string]: boolean } {
	if (categories.includes(category.value)) return null;
	else return { invalidCategory: true };
}

export const getBuzzForm = ( populate: any = {} ): FormGroup => {
	return new FormGroup({
		'category': new FormControl(populate.category || '', [Validators.required, verifyCategory]),
		'description': new FormControl(populate.description || null, [Validators.required]),
		'title': new FormControl(populate.title || null)
	});
}