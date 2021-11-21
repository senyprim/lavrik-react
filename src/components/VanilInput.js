import React from "react";
import PropTypes from "prop-types";

export default class extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    nativeProps:PropTypes.object,
  };
  constructor(props){
    super(props);
    this.inputRef = React.createRef();
  }
  componentDidUpdate(prevProps){
    const value = this.inputRef.current.value;
    console.log(`DidUpdate start : prev=${prevProps.value} props:${this.props.value} value:${value}`);
    if (prevProps.value === this.props.value && this.props.value == value) return;
    console.log(`DidUpdate Update`);

    this.inputRef.current.value=this.props.value;
  }

  //меняем value
  changeValue = (evt) => {
    //console.log(`changeValue: this.props.value=${this.props.value} evt.target.value=${evt.target.value}`);
    if (this.props.value + "" === evt.target.value) return;
    //вызываем переданный обработчик
    this.props.onChange(evt);
  };
  //Обрабатываем нажатие на Enter
  onKeyUp = (evt) => {
    if (evt.keyCode === 13) this.changeValue(evt);
  };

  render() {
    return (
      <input ref={this.inputRef}
        {...this.props.nativeProps}
        defaultValue={this.props.value}
        onBlur={this.changeValue}
        onKeyUp={this.onKeyUp}
      />
    );
  }
}