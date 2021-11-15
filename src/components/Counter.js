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
  };

  trunkValue = (value) => {
    return Math.max(this.props.min, Math.min(value, this.props.max));
  };

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
