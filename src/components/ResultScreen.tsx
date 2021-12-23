import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { IUserData } from "../models/user";
import { ActionCreator, State } from "../reducer/cart/reducer";
import { getEmail, getName, getPhone, getProducts, getTotal } from "../reducer/cart/selector";
import { Product, Pages } from "../types";


interface IProps{
  products:Product[],
  user:IUserData,
  previousPage:()=>void,
  total:number,
}

function ResultScreen(props:IProps) {
  const {products, user, previousPage,total:allTotal} = props;
  const productsRows = products.map((item, index) => {
    const { id, title, price, rest = 0, count = 0 } = item;
    const total = (price??0) * count;
    return (
      <tr key={`${id}:${0}:${rest}:${count}`}>
        <td>{title}</td>
        <td>{price}</td>
        <td>{count}</td>
        <td>{total}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>{user.name} вы заказали товара на {allTotal}</h2>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td>Count</td>
            <td>Total</td>
          </tr>
          {productsRows}
          <tr>
            <td>Итого:</td>
            <td>{allTotal}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-danger" onClick={previousPage}>
          Назад
        </button>
        <button onClick={()=>alert('Заказано')} className="btn btn-primary">
          Далее
        </button>
    </div>
  );
}

const mapStateToProps = (state:State,ownProps:IProps)=>(
  Object.assign({},ownProps,
    {
      products:getProducts(state),
      user:{
        name:getName(state),
        phone:getPhone(state),
        email:getEmail(state)
      },
      total:getTotal(state),
    }
  )
)
const mapDispatchToProps = (dispatch:Dispatch<AnyAction>)=>(
  {
    previousPage:()=>dispatch(ActionCreator.goToPage(Pages.UserData)),
  }
)

export {ResultScreen};
export default connect(mapStateToProps,mapDispatchToProps)(ResultScreen);

