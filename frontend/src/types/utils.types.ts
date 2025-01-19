/* -------------------------------------------------------------------------- */
/*                        Utilitary types                                     */
/* -------------------------------------------------------------------------- */
export type Nullish<T> = T | null | undefined;

/* -------------------------------------------------------------------------- */
/*                        Utilitary functions                                 */
/* -------------------------------------------------------------------------- */
export function isEmpty(obj: unknown) {
  // Check for both 'null' and 'undefined' with loose comparison operator.
  if (obj == null) return true;
  if (typeof obj === "string" && obj.trim() === "") return true;
  if (typeof obj === "number" && Number.isNaN(obj)) return true;
  if (Array.isArray(obj) && !obj.length) return true;
  if (typeof obj === "object" && !Object.keys(obj).length) return true;
  return false;
}

export function getOjectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[];
}

export function isKey<T extends object>(
  obj: T,
  key: PropertyKey,
): key is keyof T {
  return key in obj;
}
