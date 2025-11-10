import { Autocomplete } from "~/builders";

import { Builders, isBuilder } from "..";

export function isAutocompleteBuilder(builder: any): builder is Autocomplete {
    if (!isBuilder(builder)) return false;
    return builder instanceof Autocomplete && builder.type === Builders.Autocomplete;
}
