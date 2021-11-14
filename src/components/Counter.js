import React from "react";

export default class extends React.Component {
    
    constructor(props) {
        super(props);
        const {min,max,value,onChange}=props;
        this.onChange=onChange??function(){};
        

        this.state = {
            value: value??min??0
        };
    }
    setValue=(value)=>{
        value=value<this.min??Number.MIN_SAFE_INTEGER?this.min:value;
        value=value>this.max??Number.MAX_SAFE_INTEGER?this.max:value;
        this.setState(value);
    }
    increase =()=>this.setValue({value:this.state.value+1});
    decrease =()=>this.setValue({value:this.state.value - 1});

    render() {
        return (
            <div className="counter">
                <button className="decrease" onClick={this.decrease}>-</button>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={(value)=>onChange(value)}
                />
                <button className="increase" onClick={this.increase}>+</button>
            </div>
        )
    }
}