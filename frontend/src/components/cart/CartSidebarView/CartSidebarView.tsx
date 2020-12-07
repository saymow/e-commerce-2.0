import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../../@types";
import { CartState } from "../../../@types/redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../../actions/cartActions";
import { reduxStore } from "../../../store";
import { priceFormmater } from "../../../utils";
import Link from "../../core/Link";
import Button from "../../ui/Button";
import CartProduct from "../CartProduct";
import { Container, Details, Information, ProductList } from "./styles";

const CartSidebarView: React.FC = () => {
  const { products, subtotal, shippingCost, total } = useSelector<
    typeof reduxStore
  >((state) => state.cart) as CartState;

  return (
    <Container>
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <CartProduct product={product} />
          </li>
        ))}
      </ProductList>
      <Information>
        <Details>
          <div>
            <p>Subtotal</p> <p>{priceFormmater(subtotal)}</p>
          </div>
          <div>
            <p>Shipping Cost</p> <p>{priceFormmater(shippingCost)}</p>
          </div>
          <div>
            <strong>total</strong> <strong>{priceFormmater(total)}</strong>
          </div>
        </Details>

        <Link href="/checkout">
          <Button variant="fill">PROCEED TO CHECKOUT</Button>
        </Link>
      </Information>
    </Container>
  );
};

export default CartSidebarView;
