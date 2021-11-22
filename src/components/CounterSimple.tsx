import React from "react";
import PropTypes from "prop-types";
import VanilInput from "./VanilInput";

interface IProps{
  min:number,
  max:number,
  count:number,
  onChange:(index:number)=>void
}
function CounterSimple(props:IProps) {
  const trunkValue = (value) => {
    return Math.max(props.min, Math.min(value,props.max));
  };
  const increase = () => changeCount(props.count + 1);
  const decrease = () => changeCount(props.count - 1);
  //Безусловное обновление родительского 
  const changeCount=(newCount)=>{
      newCount = trunkValue(newCount);
      // if (props.count===newCount) return;
      props.onChange(newCount);
  }
  const acceptInputValue=(value)=>{
      const newValue = parseInt(value,10);
      changeCount(isNaN(newValue)?props.min:newValue);
  }

  return (
    <div className="counter">
      <button
        className="decrease"
        onClick={decrease}
        disabled={props.count === props.min}
      >
        -
      </button>
      <VanilInput
        value={props.count.toString()}
        onChange={(evt)=>acceptInputValue(evt.target.value)}
      />
      <button
        className="increase"
        onClick={increase}
        disabled={props.count === props.max}
      >
        +
      </button>
    </div>
  );
}

export default CounterSimple;
