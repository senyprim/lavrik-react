import React from "react";
import Cart from "./Cart";
import Order from "./Order";

export default class extends React.Component {
  state = {
    isOrder: false,
    products: getProducts()
  };

  change = (newCount, index) => {
    let products = [...this.state.products];
    products[index]={...products[index],count:newCount};
    this.setState({products})
  };

  remove = (i) => {
    let products = [...this.state.products];
    products.splice(i,1);
    this.setState({products});
  };

  setOrder = () => {
    this.setState({ isOrder: true });
  };

  render = () => {
    if (!this.state.isOrder){
      return(
        <div>
        <Cart
          products={this.state.products}
          onChange={this.change}
          onRemove={this.remove}
        />
        <button onClick={this.setOrder}>Заказать</button>
        <button onClick={()=>this.change(3,0)}>Изменить count</button>
      </div>
      )
    }
    else{
      return(
        <Order products={this.state.products} />
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
      count: 1,
    },
    {
      id: 103,
      title: "Nokia 3310",
      price: 5000,
      rest: 2,
      count: 1,
    },
    {
      id: 105,
      title: "Huawei ZZ",
      price: 15000,
      rest: 8,
      count: 1,
    },
  ]
}
