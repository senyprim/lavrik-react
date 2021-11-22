import React from "react";
import PropTypes from "prop-types";
import VanilInput from "./LazyInput";
import  styles from "./minmax.module.scss";
interface IProps{
  min:number,
  max:number,
  count:number,
  onChange:(index:number)=>void
}
function MinMax(props:IProps) {
  const trunkValue = (value:number) => {
    return Math.max(props.min, Math.min(value,props.max));
  };
  const increase = () => changeCount(props.count + 1);
  const decrease = () => changeCount(props.count - 1);
  //Безусловное обновление родительского 
  const changeCount=(newCount:number)=>{
      newCount = trunkValue(newCount);
      // if (props.count===newCount) return;
      props.onChange(newCount);
  }
  const acceptInputValue=(value:string)=>{
      const newValue = parseInt(value,10);
      changeCount(isNaN(newValue)?props.min:newValue);
  }

  return (
    <div className="counter">
      <button
        className={styles.button}
        onClick={decrease}
        disabled={props.count === props.min}
      >
        -
      </button>
      <VanilInput
        other={{className:"counter__input"}}
        value={props.count.toString()}
        onChange={(evt)=>acceptInputValue(evt.target.value)}
      />
      <button
        className="counter__button--increase button"
        onClick={increase}
        disabled={props.count === props.max}
      >
        +
      </button>
    </div>
  );
}

export default MinMax;
