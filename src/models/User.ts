import { StringKeys } from "../types";
import { ErrorStorage, ErrorType } from "./ErrorStorage";

export interface IUserData {
  name: string;
  phone: string;
  email: string;
}

class User {
  //Данные для рендера полей
  private static _formData: { [key: string]: { [key: string]: string } } = {
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
  private _name: string;
  private _phone: string;
  private _email: string;
  constructor(name = "", phone = "", email = "") {
    this._name = name;
    this._phone = phone;
    this._email = email;
  }
  public get name() {
    return this._name;
  }
  public get phone() {
    return this._phone;
  }
  public get email() {
    return this._email;
  }

  public set name(value: string) {
    this._name = value;
  }
  public set phone(value: string) {
    this._phone = value;
  }
  public set email(value: string) {
    this._email = value;
  }

  public getField = (fieldName: StringKeys<IUserData>): string => {
    switch (fieldName) {
      case "name":
        return this.name;
      case "phone":
        return this.phone;
      case "email":
        return this.email;
      default:
        throw new Error(`Invalid fiel name: ${fieldName}`);
    }
  };

  public setField = (fieldName: StringKeys<IUserData>, value: string) => {
    switch (fieldName) {
      case "name":
        this.name = value;
        break;
      case "phone":
        this.phone = value;
        break;
      case "email":
        this.email = value;
        break;
      default:
        throw new Error(`Invalid fiel name: ${fieldName}`);
    }
  };

  //Возврат данных для рендера полей
  public static getFormData(fieldName: keyof IUserData) {
    return {
      ...{},
      caption: fieldName,
      itemType: `text`,
      id: `input-${fieldName}`,
      placeholder: fieldName,
      ...User._formData[fieldName],
    };
  }

  public static _validateName = (value: string): ErrorType[] => {
    const pattern: RegExp = /^[a-z]+$/i;
    const errors: ErrorType[] = [];
    if (value !== null && !pattern.test(value))
      errors.push({
        errorNumber: 1,
        message: "Имя должно содержать только буквы",
      });
    return errors;
  };

  public static _validatePhone = (value: string): ErrorType[] => {
    const pattern: RegExp = /^[0-9]{2,14}$/i;
    const errors: ErrorType[] = [];
    if (value !== null && !pattern.test(value))
      errors.push({
        errorNumber: 1,
        message: "Телефон должен содержать только цифры",
      });
    return errors;
  };

  public static _validateEmail = (value: string): ErrorType[] => {
    const pattern: RegExp = /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i;
    const errors: ErrorType[] = [];
    if (value !== null && !pattern.test(value))
      errors.push({ errorNumber: 1, message: "Email должен содержать @" });
    return errors;
  };

  public static validate(
    fieldName: StringKeys<IUserData>,
    value: string
  ): ErrorType[] {
    switch (fieldName) {
      case "name":
        return this._validateName(value);
      case "phone":
        return this._validatePhone(value);
      case "email":
        return this._validateEmail(value);
      default:
        throw new Error(`Invalid fiel name: ${fieldName}`);
    }
    return [];
  }
}
export default User;
