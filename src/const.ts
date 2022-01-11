import { IUserData } from "~/models/User";

export const DEFAULT_USER_INPUT_PROPERTY: Record<keyof IUserData,{[key: string]: string }> = {
  name: {
    caption: `Имя`,
    placeholder: `Имя`,
  },
  email: {
    caption: `Email`,
    itemType: `email`,
    placeholder: `Электронная почта`,
  },
  phone: {
    caption: `Телефон`,
    placeholder: `Телефон`,
  },
};
export const MAIN_MENU_CAPTION:Record<string,string>={
  products:'Каталог',
  cart:'Корзина',
  order:'Контактные данные',
}

