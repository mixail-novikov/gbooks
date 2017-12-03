// @flow

export type SortingValue = "relevance" | "newest";

export type SortingItem = {
  key: SortingValue,
  value: string,
};

export const items: Array<SortingItem> = [{
  key: "relevance",
  value: "Sorted by relevance",
}, {
  key: "newest",
  value: "Sorted by date",
}];

export const itemValues: Array<SortingValue> = items.map(item => item.key);

export const defaultValue: SortingValue = "relevance";
