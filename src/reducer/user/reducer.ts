import { PropertiesType } from "../../types";
import { ErrorRecord, ErrorStorage } from "../../models/ErrorStorage";
import User, { IUserData } from "../../models/user";
type Action = ReturnType<PropertiesType<typeof ActionCreator>>;

interface IState extends IUserData {
    confirm:boolean;
    errors: ErrorRecord;
}
const InitialState: IState = {
    name:'',
    phone:'',
    email:'',

    errors: {},
    confirm:false,
};
enum ActionType {
    SET_FIELD = `SET_FIELD`,
    SET_ERRORS = `SET_ERRORS`,
    SET_CONFIRM = `SET_CONFIRM`,
}
const ActionCreator = {
    setfield: (fieldName: keyof IUserData, value: string) =>
    ({
        type: ActionType.SET_FIELD,
        payload: {
            fieldName,
            value,
            newErrors: User.validate(fieldName, value),
        },
    } as const),

    setConfirm: (confirm: boolean) =>
    ({
        type: ActionType.SET_CONFIRM,
        payload: confirm,
    } as const),
};
function reducer(state: IState = InitialState, action: Action): IState {
    switch (action.type) {
        //Устанавливает значение поля и сразу устанвливает ошибки (что бы не городить еще один reducer)
        case ActionType.SET_FIELD: {
            const { fieldName, value, newErrors } = action.payload;
            const stateValue = { [fieldName]: value };
            const errors = ErrorStorage.setErrorsTo(
                state.errors,
                fieldName,
                newErrors
            );
            return { ...state, ...stateValue, errors };
        }
        //Устанавливаем флаг подтверждения данных
        case ActionType.SET_CONFIRM:
            return { ...state, confirm: action.payload };
        default : return state
    }
}

export default reducer;
export {ActionCreator};
export type {IState};