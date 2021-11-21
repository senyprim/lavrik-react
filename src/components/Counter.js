import React from "react";
import PropTypes from "prop-types";
import VanilInput from "./VanilInput";

export default class extends React.Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    count: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    console.log(`Counter.constructor:${this.props.count}`);
  }
  state = {
    inputValue: this.props.count,
  };

  trunkValue = (value) => {
    return Math.max(this.props.min, Math.min(value, this.props.max));
  };
  //Обработчик изменния кол-ва
  changeCount = (newCount) => {
    newCount = this.trunkValue(newCount);
    if (this.props.count === newCount) return;
    this.props.onChange(newCount);
  };
  increase = () => this.changeCount(this.props.count + 1);
  decrease = () => this.changeCount(this.props.count - 1);

  //При смене в input записать изменения в state
  setInputValue = (inputValue) => {
    if (this)
    this.setState({ inputValue });
  };

  render() {
    return (
      <div className="counter">
        <button
          className="decrease"
          onClick={this.decrease}
          disabled={this.props.count === this.props.min}
        >
          -
        </button>
        <VanilInput
          value={this.state.inputValue}
          onChange={(evt) => this.setState({inputValue:evt.target.value})}
        />
        <button
          className="increase"
          onClick={this.increase}
          disabled={this.props.count === this.props.max}
        >
          +
        </button>
      </div>
    );
  }
}
