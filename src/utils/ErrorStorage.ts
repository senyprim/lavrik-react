export type ErrorType={
    errorNumber :number,
    message:string
}
export type ErrorRecord<T> = Record<keyof T, ErrorType[]>;
export class ErrorStorage<T> {
    private _errors:ErrorRecord<T>={} as ErrorRecord<T>;
    public getAllError=()=>this._errors;

    public getCategErrors=(categ:keyof T):ErrorType[]=>{
        return this._errors[categ];
    }
    public addError=(categ:keyof T, error:ErrorType):void=>{
        if (this.getCategErrors(categ)){
            this.getCategErrors(categ).push(error);
        } else {
            this._errors[categ]=[error];
        }
    }
    public setErrors=(categ:keyof T, errors?:ErrorType[]):void=>{
        if (errors!=null && errors.length>0){
            this._errors[categ]=errors
        } else {
            delete this._errors[categ];
        }
    }
    public clearErrors=(categ:keyof T):void=>{
        delete this._errors[categ];
    }
    public isEmpty(){
        return Object.keys(this._errors).length===0;
    }

}