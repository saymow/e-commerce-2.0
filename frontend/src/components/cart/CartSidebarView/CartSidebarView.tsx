import React from "react";
import { useSelector } from "react-redux";
import { CartState } from "../../../@types/redux";
import { reduxStore } from "../../../store";
import { priceFormmater } from "../../../utils";
import Link from "../../core/Link";
import Button from "../../ui/Button";
import CartLockedBackdrop from "../CartLockedBackdrop";
import useLockedCartDimensions from "../CartLockedBackdrop/useLockedCartDimensions";
import CartProduct from "../CartProduct";
import { Container, Details, Information, ProductList } from "./styles";

const CartSidebarView: React.FC = () => {
  const { products, subtotal, shippingCost, total } = useSelector<
    typeof reduxStore
  >((state) => state.cart) as CartState;

  const [productListRef, locked, dimensions] = useLockedCartDimensions();

  return (
    <Container>
      <ProductList ref={productListRef}>
        <CartLockedBackdrop locked={locked} dimensions={dimensions} />
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
