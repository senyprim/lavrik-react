import React from 'react';
import { observable, computed, action, makeObservable } from "mobx";

import {Pages} from '../types';
import Cart from "../components/Cart";
import ResultScreen from "../components/ResultScreen";
import OrderForm from '../components/OrderForm';



export class Router {
    @observable private _activePage:Pages;
    constructor(firstPage:Pages){
        console.log(`create router`);
        this._activePage=firstPage;
        makeObservable(this);
    }
    private  _routes={
        [Pages.Cart]: ()=><Cart/>,
        [Pages.UserData]:()=><OrderForm/>,
        [Pages.Finish]:()=><ResultScreen/>
    }
    @computed get activePage (){
        return this._activePage;
    }
    @action moveTo(page:Pages){
        this._activePage=page;
    }
    getComponent(){
        return this._routes[this._activePage]();
    }


    @action nextPage(){
        switch (this._activePage){
            case Pages.Cart:this._activePage=Pages.UserData;break;
            case Pages.UserData:this._activePage=Pages.Finish;break;
        }
    }
    @action previusPage(){
        switch (this._activePage){
            case Pages.UserData:this._activePage=Pages.Cart;break;
            case Pages.Finish:this._activePage=Pages.UserData;break;
        }
    }
}
export default new Router(Pages.Cart);