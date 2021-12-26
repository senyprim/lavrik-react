import React from "react";
import { match, RouteComponentProps } from "react-router-dom";
import { Product as ProductType } from "../../types";
import cart from "../../store/Cart";
import products from "../../store/Products";
import Error404 from "../../components/errors/404";
import { observer } from "mobx-react-lite";

interface IdParams {
    id: string;
}
interface IProps {

}
const Product = (props: RouteComponentProps<IdParams>) => {
    const id = parseInt(props.match.params.id);
    const product = products.getProduct(id);

    const _renderProduct = (item: ProductType) => (
        <div className="card">
            <img
                src="https://picsum.photos/100/50"
                className="card-img-top"
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Цена:{item.price ?? ""}</p>
                <p className="card-text">Остаток:{item.rest}</p>
                {cart.isOrder(item.id) ? (
                    <button className="btn btn btn-warning" type="button" onClick={() => cart.removeProduct(item.id)}>
                        Удалить из корзины
                    </button>
                ) : (
                    <button className="btn btn-success" type="button" onClick={() => cart.addProduct(item.id)}>
                        Добавить в корзину
                    </button>
                )}
            </div>
        </div>
    )

    return (
        (!product)
            ? <Error404 />
            : _renderProduct(product)
        );
}

export { Product };
export default observer(Product);