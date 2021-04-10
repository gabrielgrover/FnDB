import { getItem } from "../Store";

export function getField(id: string) {

  return getItem(id)
    .then(parseData);
}

function parseData(data: string | null) {
  return JSON.parse(data || "null");
}