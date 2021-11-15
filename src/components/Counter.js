import React from "react";
import { validate } from "schema-utils";

export default class extends React.Component {
  static trunkValue(value, minValue, maxValue) {
    value = value < minValue ? minValue : value;
    value = value > maxValue ? maxValue : value;
    return value;
  }
  constructor(props) {
    super(props);
    const { min, max, value, onChange } = props;
    this.onChange = onChange ?? function () {};
    this.min = min ?? Number.MIN_SAFE_INTEGER;
    this.max = max ?? Number.MAX_SAFE_INTEGER;
    if (this.min > this.max) {
      [this.min, this.max] = [this.max, this.min];
    }
    let initValue = this.constructor.trunkValue(value, this.min, this.max);
    initValue = this.min < 0 && this.max > 0 ? 0 : initValue;

    this.state = {
      value: initValue,
      newValue: initValue,
    };
  }
  //Проверяем новое значение
  isValidValue = (value) => {
    if (isNaN(value) || value > this.max || value < this.min) {
      return false;
    }
    return true;
  };
  //Вмещаем в диапазон
  validate = (value) => self.trunkValue(value, this.min, this.max);
  //Смена значения (если новое значение валидное то меняем state  и вызываем обработчик)
  //Если значение не валидно то возвращаем старое значение
  setValue = (value) => {
    console.log(
      `начало setValue:value=${value} state.value=${this.state.value} state.newValue=${this.state.newValue}`
    );
    if (this.isValidValue(value)) {
      console.log(`Обновляем state`);
      this.setState(
        {
          value,
          newValue: value,
        },
        () => {
          console.log(
            `конец setValue:value=${value} state.value=${this.state.value} state.newValue=${this.state.newValue}`
          );
        }
      );
    } else {
      console.log(`Сбрасываем state на предыдущий`);
      this.setState(
        (state) => {
          return {
            newValue: state.value,
          };
        },
        () => {
          console.log(
            `конец setValue:value=${value} state.value=${this.state.value} state.newValue=${this.state.newValue}`
          );
        }
      );
    }
  };
  //Обработчик потери фокуса инпута:
  changeValue = () => {
    console.log("Событие onBlur");
    const newValue = parseInt(this.state.newValue, 10);
    this.setValue(newValue);
  };
  //Обработчик изменения инпута (просто записываем в input как есть)
  setNewValue = (value) => {
    this.setState({
      newValue: value,
    });
  };

  increase = () => this.setValue(this.state.value + 1);
  decrease = () => this.setValue(this.state.value - 1);

  render() {
    return (
      <div className="counter">
        <button className="decrease" onClick={this.decrease}>
          -
        </button>
        <input
          type="text"
          value={this.state.newValue}
          onChange={(evt) => this.setNewValue(evt.target.value)}
          onBlur={this.changeValue}
        />
        <button className="increase" onClick={this.increase}>
          +
        </button>
      </div>
    );
  }
}
