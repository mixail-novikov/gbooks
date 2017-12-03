// @flow

export type PrintTypeValue = "all" | "books" | "magazines";

export type PrintTypeItem = {
  key: PrintTypeValue,
  value: string,
};

export const items: Array<PrintTypeItem> = [{
  key: "all",
  value: "Any document",
}, {
  key: "books",
  value: "Books",
}, {
  key: "magazines",
  value: "Magazines",
}];

export const itemValues: Array<PrintTypeValue> = items.map(item => item.key);

export const defaultValue: PrintTypeValue = "all";
