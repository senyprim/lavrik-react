import React, { ChangeEvent, HTMLAttributes } from "react";
import { isPropertySignature } from "typescript";

interface IProps{
  value?:string,
  onChange:(evt:ChangeEvent<HTMLInputElement>)=>void,
  other?:HTMLAttributes<HTMLInputElement>
}


export default class extends React.Component<IProps> {
  private inputRef:React.RefObject<HTMLInputElement>;

  constructor(props:IProps){
    super(props);
    this.inputRef = React.createRef();
  }
  componentDidUpdate(prevProps:IProps){
    const value = this.inputRef?.current?.value;
    console.log(`DidUpdate start : prev=${prevProps.value} props:${this.props.value} value:${value}`);
    if (prevProps.value === this.props.value && this.props.value == value) return;
    console.log(`DidUpdate Update`);
    if (this.inputRef.current){
      this.inputRef.current.value=this.props.value??'';
    }

  }

  //меняем value
  changeValue = (evt:React.FocusEvent<HTMLInputElement>|React.KeyboardEvent<HTMLInputElement>) => {
    const changeEvt = evt as ChangeEvent<HTMLInputElement>;
    // const inputValue = (evt.target as HTMLInputElement).value;
    if (this.props.value + "" === changeEvt.target.value) return;
    //вызываем переданный обработчик
    this.props.onChange(changeEvt);
  };
  //Обрабатываем нажатие на Enter
  onKeyUp = (evt:React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      this.changeValue(evt);
    }
  };

  render() {
    return (
      <input ref={this.inputRef}
        {...this.props.other}
        defaultValue={this.props.value}
        onBlur={this.changeValue}
        onKeyUp={this.onKeyUp}
      />
    );
  }
}
