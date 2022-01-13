import { observable, computed, action, makeObservable } from "mobx";
import { HTMLAttributes, HTMLInputTypeAttribute } from "react";
import { User as UserType } from "../types";
import { ErrorStorage } from "../utils/ErrorStorage";
import { IGlobalStorage } from "./GlobalStore";

export interface IRequiredProperty {
  id: string;
  caption: string;
  placeholder: string;
  itemType: HTMLInputTypeAttribute;
}
export type PropertyType = IRequiredProperty &
  Partial<HTMLAttributes<HTMLInputElement>>;
export type FormDataType = Record<keyof UserType, PropertyType>;

export default class User {
  //Данные для рендера полей
  private static _formData: Partial<
    Record<keyof UserType, Partial<PropertyType>>
  > = {
    name: {
      id: "1",
      caption: `Имя`,
      placeholder: `Имя`,
      itemType: "email",
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

  //Хранилище ошибок
  errors = new ErrorStorage<UserType>();

  @observable private _user: UserType;
  @observable private _confirm: boolean = false;
  globalStorage: IGlobalStorage;

  constructor(
    globalStorage: IGlobalStorage,
    user: UserType = {
      name: null,
      phone: null,
      email: null,
    }
  ) {
    this.globalStorage = globalStorage;
    this._user = user;
    this.validateAll();
    makeObservable(this);
  }

  //Возврат данных для рендера полей
  public getFormData(fieldName: keyof UserType): PropertyType {
    return {
      caption: fieldName,
      itemType: `text`,
      id: `input-${fieldName}`,
      placeholder: fieldName,
      ...User._formData[fieldName],
    };
  }
  public getAllFormData(): FormDataType {
    const result = {} as FormDataType;
    Object.keys(this._user)
      .map((it) => it as keyof UserType)
      .forEach((fieldName) => {
        result[fieldName] = this.getFormData(fieldName);
      });
    return result;
  }
  //Получение свойства по имени
  getField = (fieldName: keyof UserType): string | null =>
    this._user[fieldName];
  //Получение всех свойств
  getAllFields = () => ({ ...this._user });
  //Обновление полей
  @action setField = (fieldName: keyof UserType, value: string | null) => {
    this._user[fieldName] = value;
    this.validateField(fieldName);
  };
  //Валидация
  public _validateName = (): void => {
    const value = this.getField(`name`);
    const pattern: RegExp = /^[a-z]+$/i;
    this.errors.clearErrors("name");
    if (value !== null && !pattern.test(value))
      this.errors.setErrors("name", [
        { errorNumber: 1, message: "Имя должно содержать только буквы" },
      ]);
  };
  public _validateEmail = (): void => {
    this.errors.clearErrors("email");
    const value = this.getField(`email`);
    const pattern: RegExp = /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i;
    if (value !== null && !pattern.test(value))
      this.errors.setErrors("email", [
        { errorNumber: 1, message: "Email должен содержать @" },
      ]);
  };
  public _validatePhone = (): void => {
    this.errors.clearErrors("phone");
    const value = this.getField(`phone`);
    const pattern: RegExp = /^[0-9]{2,15}$/i;
    if (value !== null && !pattern.test(value))
      this.errors.setErrors("phone", [
        { errorNumber: 1, message: "Телефон должен содержать только цифры" },
      ]);
  };
  public validateField = (fieldName: keyof UserType): void => {
    switch (fieldName) {
      case "name":
        this._validateName();
        break;
      case "email":
        this._validateEmail();
        break;
      case "phone":
        this._validatePhone();
        break;
    }
  };
  public validateAll = (): void => {
    (Object.keys(this._user) as Array<keyof UserType>).forEach(
      this.validateField
    );
  };

  //Обновление всего
  @action setAllFilds = (user: UserType) => {
    this._user = { ...user };
    this.validateAll();
  };
  //Установка подтверждения  данных (на всякий случай проверяем валидность)
  @action setConfirm(value: boolean) {
    this._confirm = this.errors.isEmpty() && value;
  }
  @computed get confirm() {
    return this._confirm;
  }
  isValidField(fieldName?: keyof UserType) {
    //Если хоть одно значение не заполненно - форма невалидна
    if (fieldName) {
      return (
        this.getField(fieldName) != null &&
        (this.errors.getCategErrors(fieldName) || []).length == 0
      );
    } else {
      return (
        !Object.values(this.getAllFields()).some((it) => it == null) &&
        this.errors.isEmpty()
      );
    }
  }
  @computed get isValid() {
    return this.errors.isEmpty();
  }

}
