import { PropertiesType} from "../../types";
import { ErrorStorage } from "../../models/ErrorStorage";
import { User } from "./user";
type Action = ReturnType<PropertiesType<typeof ActionCreator>> 


interface IState<T extends User>{
    value:T|null,
    errors:ErrorStorage<T>,
}
const InitialState:IState<User> = {
    value:null,
    errors:new ErrorStorage()
}
