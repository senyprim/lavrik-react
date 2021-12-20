import { observable, computed, action, makeObservable } from "mobx";
import { ErrorType } from "../types";
import { User as UserType } from "../types";

class User {
  //Шаблоны для проверки полей

  private static _fieldsPattern: { [key in keyof UserType]: RegExp } = {
    name: /^[a-z]+$/i,
    phone: /^[0-9]+$/i,
    email: /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i,
  };
  //Данные для рендера полей
  private static _formData: { [key: string]: { [key: string]: string } } = {
    name: {
      caption: `Имя`,
    },
    email: {
      caption: `Email`,
      itemType: `email`,
    },
    phone: {
      caption: `Phone`,
      placeholder: `Телефон`,
    },
  };
  //Хранилище ошибок
  private _errors: { [key in keyof UserType]?: ErrorType[] } = {};

  @observable private _user: UserType;
  @observable private _confirm: boolean = false;

  constructor(
    name: string | null = null,
    phone: string | null = null,
    email: string | null = null
  ) {
    makeObservable(this);
    this._user = {
      name,
      phone,
      email,
    };
    this.checkAllFields();
  }
  
  //Возврат данных для рендера полей
  public getFormData(fieldName: keyof UserType) {
    return {
      ...{},
      caption: fieldName,
      itemType: `text`,
      id: `input-${fieldName}`,
      palceholder: fieldName,
      ...User._formData[fieldName],
    };
  }
  //Что бы нельзя было поменять ошибки из вне отдаем копию
  getErrors = () => {
    const allErrors: typeof this._errors = {};
    for (const fieldName of Object.keys(this._errors) as Array<
      keyof UserType
    >) {
      allErrors[fieldName] = this._errors[fieldName]?.map((it) => [...it]);
    }
  };
  //Ошибки определенного поля
  getFieldErrors = (fieldName:keyof UserType):ErrorType[]=>{
        return [...this._errors[fieldName]||[]];
  }

  //простая проверка поля получает имя поля и его значение и возвращает список ошибок или пустой массив
  commonCheckField(
    fieldName: keyof UserType,
    value: string | null
  ): ErrorType[] {
    const errors: ErrorType[] = [];
    if (value == null || value.trim() === ``) {
      errors.push([`${fieldName}-1`, `Поле обязательное`]);
    } else {
      if (!User._fieldsPattern[fieldName].test(value))
        errors.push([`${fieldName}-2`, `Не соответствует шаблону`]);
    }
    return errors;
  }
  //Обновляем ошибки поля (если ошибок нет удаляем)
  checkField = (fieldName: keyof UserType): void => {
    const errors = this.commonCheckField(fieldName, this.getField(fieldName));
    if (errors.length !== 0) {
      this._errors[fieldName] = errors;
    } else {
      delete this._errors[fieldName];
    }
  };
  //Проверка всех полей
  checkAllFields = (): void => {
    (Object.keys(this._user) as Array<keyof UserType>).forEach(this.checkField);
  };
  //Обновление одного поля
  @action setField = (fieldName: keyof UserType, value: string|null) => {
    this._user[fieldName] = value;
    this.checkField(fieldName);
  };
  //Обновление значения
  @action setAllFilds = (user: UserType) => {
    this._user = {...user};
    this.checkAllFields();
  };
  //Получение свойства по имени
  getField = (fieldName: keyof UserType): string | null =>
    this._user[fieldName];
  //Получение всех свойств
  getAllFields=()=>({ ...this._user });
  //Если ошибок нет
  isValid = (fieldName:keyof UserType | null = null): boolean =>{
      if (fieldName==null) {
          return Object.keys(this._errors).length == 0;
      }
      return (this._errors[fieldName]??[]).length==0;
  } 
  //Установка подтверждения  данных (на всякий случай проверяем валидность)
  @action setConfirm(value:boolean){
    this._confirm = this.isValid() && value;
  };
  @computed get confirm(){
      return this._confirm;
  }
}
export default new User();
