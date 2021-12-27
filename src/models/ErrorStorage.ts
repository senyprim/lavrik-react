export type ErrorType={
    errorNumber :number,
    message:string
}
export type ErrorRecord = Record<string, ErrorType[]>;
export class ErrorStorage {
    private _errors:ErrorRecord ={} as ErrorRecord;
    public static setErrorsTo(allErrors:ErrorRecord, categ:string, errors?:ErrorType[]):ErrorRecord{
        const result = {...allErrors};
        if (errors!=null && errors.length>0){
            result[categ]=errors
        } else {
            delete result[categ];
        }
        return result;
    }
    public static getCategErrorsFrom(allErrors:ErrorRecord,categ:string){
        return allErrors[categ];
    }
    public getCategErrors=(categ:string):ErrorType[]=>{
        return this._errors[categ];
    }
    public addError=(categ:string, error:ErrorType):void=>{
        if (this.getCategErrors(categ)){
            this.getCategErrors(categ).push(error);
        } else {
            this._errors[categ]=[error];
        }
    }
    public setErrors=(categ:string, errors?:ErrorType[]):void=>{
        if (errors!=null && errors.length>0){
            this._errors[categ]=errors
        } else {
            delete this._errors[categ];
        }
    }
    public static isEmpty(allErrors:ErrorRecord){
        return Object.keys(allErrors).length===0;
    }
    public clearErrors=(categ:string):void=>{
        delete this._errors[categ];
    }
    public isEmpty(){
        return ErrorStorage.isEmpty(this._errors);
    }
}