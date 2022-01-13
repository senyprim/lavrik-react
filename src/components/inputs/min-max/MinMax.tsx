import React, { useRef } from "react";
import VanilInput from "../lazy/LazyInput";
import  styles from "./minmax.module.scss";

export interface IProps{
  min:number,
  max:number,
  count:number,
  onChange:(newCount:number)=>void
}
function MinMax(props:IProps) {

  //ref для доступа к input
  const ref = useRef<VanilInput>(null);

  //Вписать value  в ограничения
  const trunkValue = (value:number) => {
    return Math.max(props.min, Math.min(value,props.max));
  };
  const increase = () => changeCount(props.count + 1);
  const decrease = () => changeCount(props.count - 1);
  //Обновление данных когда новое и старое значение не совподают
  const changeCount=(newCount:number)=>{
      newCount = trunkValue(newCount);
      if (props.count===newCount) return;
      props.onChange(newCount);
  }
  const acceptInputValue=(value:string)=>{
      const intValue = parseInt(value,10);
      const newValue = isNaN(intValue)?props.min:intValue;
      if (newValue.toString()!==value && ref?.current!==null){
        //Обновить VanilInput
        ref.current.setValue(newValue.toString());
      }
      changeCount(newValue);
  }

  return (
    <div className={styles.counter}>
      <button
        className={styles.button}
        onClick={decrease}
        disabled={props.count === props.min}
      >
      </button>
      <VanilInput
        ref={ref}
        other={{className:styles.input}}
        value={props.count.toString()}
        onChange={(evt)=>acceptInputValue(evt.target.value)}
      />
      <button
        className={`${styles.button} ${styles.buttonPlus}`}
        onClick={increase}
        disabled={props.count === props.max}
      >
      </button>
    </div>
  );
}

export default MinMax;
