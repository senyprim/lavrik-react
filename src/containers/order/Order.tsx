import React from "react";
import { inject,observer } from "mobx-react";
import { IGlobalStorage } from "~/models/GlobalStore";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routesMap } from "~/routes";
import OrderForm from "~/components/order";
import {User as UserType} from "~/types";

interface IProps extends RouteComponentProps<any>{
    store:IGlobalStorage;
}

const wrapperOrder = (props:IProps)=>{
    const {store,history} = props;
    return (
    <OrderForm
    user={store.user.getAllFields()}
    formData={store.user.getAllFormData()}
    confirm={store.user.confirm}
    changeUser={(field: keyof UserType, value: string)=>store.user.setField(field,value)}
    setConfirm={(confirm: boolean) => store.user.setConfirm(confirm)}
    nextPage={() => history.push(routesMap.result)}
    previousPage={()=>history.push(routesMap.cart)}
    errors={store.user.errors.getAllError()}
    isValidUser={store.user.isValid}
    />
    )
}
export default withRouter(inject('store')(observer(wrapperOrder)));