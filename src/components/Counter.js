import React from "react";
import PropTypes from "prop-types";

export default class extends React.Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number,
  };

  state = {
    value: this.props.min,
    newValue:this.props.min
  };

  trunkValue = (value) => {
    return Math.max(this.props.min, Math.min(value, this.props.max));
  };

  increase = () => this.set(this.state.value + 1);
  decrease = () => this.set(this.state.value - 1);

  set = (value) => {
    value = this.trunkValue(value);
    this.setState({ value,newValue:value });
  };

  acceptNewValue=()=>{
    const value = parseInt(this.state.newValue,10);
    this.set(isNaN(value)?this.props.min:value);
  }

  setNewValue(newValue){
    this.setState({newValue:newValue});
  }

  render() {
    return (
      <div className="counter">
        <button className="decrease" onClick={this.decrease}>
          -
        </button>
        <input
          value={this.state.newValue}
          onChange={(evt) => this.setNewValue(evt.target.value)}
          onBlur={this.acceptNewValue}
        />
        <button className="increase" onClick={this.increase}>
          +
        </button>
      </div>
    );
  }
}
