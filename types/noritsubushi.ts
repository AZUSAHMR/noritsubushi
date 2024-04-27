export type LINE_TYPE = "line" | "system";
export const AREA_LIST = ["all", "mp", "cc", "hn", "yn"] as const;
export type STATION_DATA = { line: string; name: string };
export type TOGGLE_STATE = STATION_DATA | null;
export type HISTORY_DATA = { origin: STATION_DATA; destination: STATION_DATA };
