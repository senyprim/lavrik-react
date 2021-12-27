import React from "react";
import {Product } from "../../types";
import {IState as IGlobalState} from "../../reducer";


import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import products from "../../reducer/products";

interface IProps {
  products:Product[]
}

const App = (props: IProps) => {

 
};

export  default App;
