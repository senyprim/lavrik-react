import { observable, computed, action, makeObservable } from "mobx";

class User{
    @observable private _name:string='';
    @observable private _phone:string='';
    @observable private _email:string='';
    @observable private _confirm:boolean=false;
    constructor (){
        makeObservable(this);
    }


    get name(){ return this._name;}
    @action setName(newName:string){ this._name=newName;}

    get phone(){ return this._phone;}
    @action setPhone(newPhone:string){ this._phone=newPhone;}

    get email(){ return this._email;}
    @action setEmail(newEmail:string){ this._email=newEmail;}

    get confirm(){ return this._confirm;}
    @action setConfirm(newConfirm:boolean){ this._confirm=newConfirm;}
}

export default new User();