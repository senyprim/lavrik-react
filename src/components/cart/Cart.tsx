import React from "react";
import { AnyAction, Dispatch } from "redux";
import { connect } from "react-redux";

import MinMax from "../MinMax";
import { Pages, Product } from "../../types";
import { ActionCreator, getTotal, getProducts, CartType } from "../../reducer/products";
import { IState as IGlobalState} from "../../reducer";

interface IProps {
  cart: CartType;
  total: number;
  onRemove: (id: number) => void;
  onAdd: (id: number,count: number) => void;
}

const Cart = (props: IProps)=>{
  console.log(`Render cart page`);
  const { cart, onAdd: addToCart, onRemove: onRemoveFromCart, total} = props;

  const _renderCartItem = (item:Product&CartType)=>{
     const { id, title, price, rest = 0, count = 0 } = item;
     return (
      <tr key={id} className="cart__product-row">
        <td className="cart__product-name">
            <h4>{title}</h4>
        </td>
        <td className="text-center text-lg text-medium">{price}</td>
        <td className="cart__product-count">
            <MinMax
            min={0}
            max={rest}
            onChange={(newCount: number) => onChange(id, newCount)}
            count={count}
            />
        </td>
        <td className="text-center text-lg text-medium">{total}</td>
        <td className="cart__action-row ">
            <a
            onClick={() => onRemove(id)}
            className="btn btn-danger"
            href="#"
            >
            Удалить
            </a>
        </td>
    </tr>
    )
  }

  
 
  // const _products = cart.map((item) => {
  //   const total = (price ?? 0) * count;
  //   return (

  //   );
  // });

  return (
//     <div className="padding-bottom-3x mb-1">
//       <h2 className="cart_title">
//         Shopping Cart
//         <small> ({products.length} item in your cart) </small>
//       </h2>
//       <div className="">
//         <table className="table table-striped table-bordered border-primary">
//           <thead>
//             <tr className="cart__header-row">
//               <td className="text-center">Title</td>
//               <td className="text-center">Price</td>
//               <td className="text-center">Count</td>
//               <td className="text-center">Total</td>
//               <td className="text-center">Action</td>
//             </tr>
//           </thead>
//           <tbody>
//             {_products}
//             <tr className="cart__total-row">
//               <td colSpan={5}>Итого:{total}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <button className="btn btn-primary" onClick={()=>goToPage(Pages.UserData)}>
//         Далее
//       </button>
//     </div>
    );
}
const mapStateToProps = (state: IGlobalState) => {
  return {
    products: getProducts(state),
    total:getTotal(state)
  };
};
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    onChange: (id: number, count: number) =>
      dispatch(ActionCreator.addProductToCart(id, count)),
    onRemove: (id:number) => {
      dispatch(ActionCreator.deleteProduct(id))
    }
};
export {Cart};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
