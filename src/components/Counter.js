import React from "react";
import PropTypes from "prop-types";

export default class extends React.Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    count: PropTypes.number,
    onChange:PropTypes.func.isRequired
  };
  constructor(props){
    super(props);
    console.log(`Counter.constructor:${props}`);
  }
  state = {
    inputValue: this.props.count,
  };

  trunkValue = (value) => {
    return Math.max(this.props.min, Math.min(value, this.props.max));
  };

  increase = () => this.changeCount(this.props.count + 1);
  decrease = () => this.changeCount(this.props.count - 1);
  //меняем count
  changeCount = (value) => {
    value = this.trunkValue(value);
    console.log(`changeCount:${value}`);
    this.props.onChange(value);
  };
  //При смене в input записать изменения в state
  setInputValue=(inputValue)=>{
    this.setState({inputValue})
  }
  //При потере фокуса меняем count
  acceptInputValue=()=>{
    const inputValue = parseInt(this.state.inputValue);
    this.changeCount(isNaN(inputValue)?this.props.min:inputValue);
  }

  render() {
    return (
      <div className="counter">
        <button 
        className="decrease" 
        onClick={this.decrease}
        disabled={this.props.count===this.props.min}
        >
          -
        </button>
        <input 
        value={this.state.inputValue}
        onChange={(evt)=>this.setInputValue(evt.target.value)}
        onBlur={this.acceptInputValue}
        />
        <button 
        className="increase" 
        onClick={this.increase}
        disabled={this.props.count===this.props.max}
        >
          +
        </button>
      </div>
    );
  }
}
