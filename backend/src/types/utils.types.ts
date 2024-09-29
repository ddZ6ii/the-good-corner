export type ExcludeMethods<T> = {
  [K in keyof T as T[K] extends () => void ? never : K]: T[K];
};
