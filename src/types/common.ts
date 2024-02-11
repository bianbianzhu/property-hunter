// this only works with the first level of the object
export type RenameByT<T, U> = {
  [K in keyof U as K extends keyof T ? (T[K] extends string ? T[K] : never) : K]: K extends keyof U
    ? U[K]
    : never;
};
