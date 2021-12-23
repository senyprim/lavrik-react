import { DEFAULT_USER_INPUT_PROPERTY } from "../const";
import { IUserData } from "../models/user";
//Создает набор свойст по умолчанию и уточняет их их константы

export const getDefaultInputProperty = (
  fieldName: keyof IUserData,
  properties?: Record<string, string>
): Record<string, string> => ({
  caption: fieldName,
  itemType: `text`,
  id: `input-${fieldName}`,
  placeholder: fieldName,
  ...DEFAULT_USER_INPUT_PROPERTY[fieldName],
  ...properties,
});
