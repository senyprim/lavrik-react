import React from "react";

export default class extends React.Component {
    
    constructor(props) {
        super(props);
        const {min,max,value,onChange}=props;
        this.onChange=onChange??function(){};
        this.min=min??Number.MIN_SAFE_INTEGER;
        this.max=max??Number.MAX_SAFE_INTEGER;
        if (this.min>this.max) {
            (this.min,this.max)=(this.max,this.min);
        }


        

        this.state = {
            value: value??min??0
        };
    }
    //Проверяем новое значение 
    isValidValue=(value)=>{
        if (value>max || value<min){
            return false;
        }
        return true;
    }
    validateValue=(value)=>{
        value=value<this.min?this.min:value;
        value=value>this.max?this.max:value;
        return value;
    }
    //Вмещаем в диапазон
    
    setValue=(value)=>{
        value = typeof value == "string" ? parseInt(value) :value;
        if (this.isValidValue(value)){
            this.setState({value:value});
            this.onChange(value);
        }
    }

    increase =()=>this.setValue(this.state.value+1);
    decrease =()=>this.setValue(this.state.value-1);

    render() {
        return (
            <div className="counter">
                <button className="decrease" onClick={this.decrease}>-</button>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={(evt)=>this.setValue(evt.target.value)}
                />
                <button className="increase" onClick={this.increase}>+</button>
            </div>
        )
    }
}