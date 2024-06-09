import { isBuilder } from '..';
import { Autocomplete } from '../../builders';
import { Builders } from '../../types';

export function isAutocompleteBuilder(builder: any): builder is Autocomplete {
	if (!isBuilder(builder)) return false;
	return builder instanceof Autocomplete && builder.type === Builders.Autocomplete;
}
