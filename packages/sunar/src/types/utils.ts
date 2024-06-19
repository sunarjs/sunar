export type Prettify<TObject> = { [TKey in keyof TObject]: TObject[TKey] } & {};

export type NextFunction = () => symbol;
