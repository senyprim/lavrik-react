import React from "react";
import Cart from "./Cart";
import ResultScreen from "./ResultScreen";
import {Product} from "../types";



interface IState{
  isOrderComplete:boolean,
  products:Product[]
}

export default class extends React.Component<null,IState> {
  state = {
    isOrderComplete: false,
    products: getProducts()
  };

  changeProductCount = (newCount:number, index:number):void => {
    let products = [...this.state.products];
    products[index]={...products[index],count:newCount};
    this.setState({products})
  };

  removeProduct = (i:number):void => {
    let products = [...this.state.products];
    products.splice(i,1);
    this.setState({products});
  };

  orderComplete = () => {
    this.setState({ isOrderComplete: true });
  };
  get total(){
    return this.state.products.reduce((ac, i) => ac + i.count * (i.price??0), 0);
  }
  
  render = () => {
    if (!this.state.isOrderComplete){
      return(
        <div className="app__cart">
        <Cart
          products={this.state.products}
          onChange={this.changeProductCount}
          onRemove={this.removeProduct}
        />
        <button className="app__button app__button--to-order" onClick={this.orderComplete}>Заказать</button>
      </div>
      )
    }
    else{
      return(
        <ResultScreen products={this.state.products} />
      )
    }
  };
}


const getProducts=()=>{
  return [
    {
      id: 100,
      title: "Ipnone 200",
      price: 12000,
      rest: 10,
      count: 1,
    },
    {
      id: 101,
      title: "Samsung AAZ8",
      price: 22000,
      rest: 5,
      count: 2,
    },
    {
      id: 103,
      title: "Nokia 3310",
      price: 5000,
      rest: 3,
      count: 3,
    },
    {
      id: 105,
      title: "Huawei ZZ",
      price: 15000,
      rest: 8,
      count: 4,
    },
  ]
}
