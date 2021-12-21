import { Product, User } from "../../types";
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never; 
type Action = ReturnType<PropertiesType<typeof ActionCreator>> 
interface State{
    name:string|null,
    email:string|null,
    phone:string|null,
    confirm:boolean,
    products:Product[]|null
}
const initialState:State={
    name:null,
    email:null,
    phone:null,
    confirm:false,
    products:null
}
enum ActionType{
    LOAD_PRODUCTS=`LOAD_PRODUCTS`,
    SET_NAME=`SET_NAME`,
    SET_EMAIL=`SET_EMAIL`,
    SET_PHONE=`SET_PHONE`,
    SET_CONFIRM=`SET_CONFIRM`,
    DELETE_PRODUCT=`DELETE_PRODUCT`,
    CHANGE_COUNT=`CHANGE_COUNT`
}
const ActionCreator = {
    loadProducts:(products:Product[]|null)=>({
        type:ActionType.LOAD_PRODUCTS,
        payload:products
    } as const),
    setName:(name:string|null)=>({
        type:ActionType.SET_NAME,
        payload:name
    } as const),
    setEmail:(email:string|null)=>({
        type:ActionType.SET_EMAIL,
        payload:email
    } as const),
    setPhone:(phone:string|null)=>({
        type:ActionType.SET_PHONE,
        payload:phone
    } as const),
    setConfirm:(confirm:boolean)=>({
        type:ActionType.SET_CONFIRM,
        payload:confirm
    } as const),
    deleteProduct:(idProduct:number)=>({
        type:ActionType.DELETE_PRODUCT,
        payload:idProduct
    } as const),
    changeCountProduct:(idProduct:number, count:number)=>({
        type:ActionType.CHANGE_COUNT,
        payload:{id:idProduct,count}
    } as const)
}
const Operation = {
    loadCartProducts:()=>
}
function reducer(state:State=initialState,action:Action):State{
    switch (action.type){
        case ActionType.LOAD_PRODUCTS:
            return {...state, products: action.payload}; 
        case ActionType.SET_NAME:
                return {...state, name: action.payload}; 
        case ActionType.SET_EMAIL:
                return {...state, email: action.payload}; 
        case ActionType.SET_PHONE:
                return {...state, phone: action.payload}; 
        case ActionType.SET_CONFIRM:
                return {...state, confirm: action.payload}; 
        case ActionType.DELETE_PRODUCT:
                return {...state, products: state.products?.filter(it=>it.id!=action.payload)??null}; 
        case ActionType.CHANGE_COUNT:
                    return {...state, products: state.products?.
                        map(it=>it.id===action.payload.id
                                ?{...it,count:action.payload.count}
                                :it)??null}; 
        default: return state;
    }
}

export {reducer,ActionCreator}