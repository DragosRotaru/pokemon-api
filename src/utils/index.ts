import { distance } from "fastest-levenshtein";

/** Computes the Levenshtein string metric. The range of this function is [0, +infinity) */
export const levenshtein = distance;

/** Function composition helper method */
export const compose = <Type>(...fns: ((...args: any[]) => Type)[]) => (
  x: Type
) => fns.reduceRight((y, f) => f(y), x);

/** Union type from array of literal values  */
export type ArrayLiteral<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
