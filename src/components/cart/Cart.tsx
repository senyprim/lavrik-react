import React, { Fragment } from "react";
import MinMax from "~/components/inputs/min-max";
import { OrderProduct, Product } from "~/types";

interface IProps  {
  cartWithProductData: OrderProduct[];
  total: number;
  onRemove: (id: number) => void;
  onChange: (id: number,count: number) => void;
  goToPage: ()=>void;
}

const Cart = (props: IProps)=>{
  const { cartWithProductData, onChange, onRemove, total, goToPage} = props;

  const _renderCartItem = (item:OrderProduct,
    onChange: (id: number,count: number) => void,
    onRemove: (id: number) => void
    )=>{
     const { id, title, price, rest = 0, count = 0 } = item;
     const total=count*(price??0);
     return (
      <Fragment>
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
        </Fragment>
    )
  }
  const _renderCartItems=(
    cart:OrderProduct[],
    onChange: (id: number,count: number) => void,
    onRemove: (id: number) => void
    )=> cart.map((item) => {
    return (
      <tr key={item.id} className="cart__product-row">
        {_renderCartItem(item,onChange,onRemove)}
      </tr>
    );
  });

  return (
    <div className="padding-bottom-3x mb-1">
      <h2 className="cart_title">
        Shopping Cart
        <small> ({cartWithProductData.length} item in your cart) </small>
      </h2>
      <div className="">
        <table className="table table-striped table-bordered border-primary">
          <thead>
            <tr className="cart__header-row">
              <td className="text-center">Title</td>
              <td className="text-center">Price</td>
              <td className="text-center">Count</td>
              <td className="text-center">Total</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {_renderCartItems(cartWithProductData,onChange,onRemove)}
            <tr className="cart__total-row">
              <td colSpan={5}>Итого:{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" onClick={goToPage}>
        Далее
      </button>
    </div>
    );
}

export default  Cart;
