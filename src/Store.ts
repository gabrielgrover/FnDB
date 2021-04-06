import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StoreKeys {
  TABLES = "TABLES",
  TABLE_FIELDS = "TABLE_FIELDS"
}

export function setItem(key: string, item: string) {
  return AsyncStorage.setItem(key, item);
}

export function getItem(key: string) {
  return AsyncStorage.getItem(key);
}