import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  trunkValue = (value) => {return Math.max(this.props.min, Math.min(value, this.props.max));};
  
  increase = () => this.set(this.state.value + 1);
  decrease = () => this.set(this.state.value - 1);
  set = (value) => {
    value = this.trunkValue(value);
    this.setState({ value });
  };

  render() {
    return (
      <div className="counter">
        <button className="decrease" onClick={this.decrease}>
          -
        </button>
        <span>{this.state.value}</span>
        <button className="increase" onClick={this.increase}>
          +
        </button>
      </div>
    );
  }
}
