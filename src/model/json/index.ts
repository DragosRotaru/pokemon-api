export type JSONPrimitive = boolean | number | string | null;
export type JSON = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSON };
export interface JSONArray extends ReadonlyArray<JSON> {}
