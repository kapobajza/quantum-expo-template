export type ObjectValues<TEnumObject> = TEnumObject[keyof TEnumObject];

export type Prettify<TObject> = {
  [Key in keyof TObject]: TObject[Key];
} & {};

export type SnakeToPascalCase<Key extends string | number | symbol> =
  Key extends `${infer T}_${infer U}`
    ? `${Capitalize<Lowercase<T>>}${SnakeToPascalCase<U>}`
    : Capitalize<Lowercase<Key & string>>;

export type CamelToSnakeCase<Key extends string | number | symbol> =
  Key extends `${infer T}${infer U}`
    ? T extends Lowercase<T>
      ? `${Uppercase<T>}${CamelToSnakeCase<U>}`
      : `_${Uppercase<T>}${CamelToSnakeCase<U>}`
    : Uppercase<Key & string>;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export type Leaves<T> = T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T]
  : '';

export type NonEmptyArray<T> = [T, ...T[]];
