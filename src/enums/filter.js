// @flow

export type FilterValue = "all" | "partial" | "ebooks" | "free-ebooks";

export type FilterItem = {
  key: FilterValue,
  value: string,
};

export const items: Array<FilterItem> = [{
  key: "all",
  value: "Any books",
}, {
  key: "partial",
  value: "Preview available"
}, {
  key: "ebooks",
  value: "Google eBooks"
}, {
  key: "free-ebooks",
  value: "Free Google eBooks"
},];

export const itemValues: Array<FilterValue> = items.map(item => item.key);

export const defaultValue: FilterValue = "all";
