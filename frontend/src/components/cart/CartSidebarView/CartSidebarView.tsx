import Image from "next/image";
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
import Button from "../../ui/Button";
import {
  Container,
  Details,
  Information,
  MinusIcon,
  PlusIcon,
  Product,
  ProductDetails,
  ProductImage,
  ProductList,
  ProductName,
  ProductPrice,
  QtyContainer,
  RemoveProductIcon,
} from "./styles";

const CartSidebarView: React.FC = () => {
  const dispatch = useDispatch();

  const { products, subtotal, shippingCost, total } = useSelector<
    typeof reduxStore
  >((state) => state.cart) as CartState;

  const handleAddProductToCart = (product: IProduct) => {
    dispatch(addProductToCart(product));
  };

  const handleRemoveProductFromCart = (id: string, force = false) => {
    dispatch(removeProductFromCart(id, force));
  };

  return (
    <Container>
      <ProductList>
        {products.map((product) => (
          <Product key={product.id}>
            <ProductImage>
              <Image src={product.image} width={80} height={80} />
            </ProductImage>
            <ProductDetails>
              <div>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{priceFormmater(product.price)}</ProductPrice>
              </div>
              <RemoveProductIcon
                onClick={() => handleRemoveProductFromCart(product.id, true)}
              />
              <QtyContainer>
                <button onClick={() => handleRemoveProductFromCart(product.id)}>
                  <MinusIcon />
                </button>
                <input
                  type="number"
                  readOnly
                  value={product.qty}
                  max={99}
                  min={1}
                />
                <button onClick={() => handleAddProductToCart(product)}>
                  <PlusIcon />
                </button>
              </QtyContainer>
            </ProductDetails>
          </Product>
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
        <Button variant="fill">PROCEED TO CHECKOUT</Button>
      </Information>
    </Container>
  );
};

export default CartSidebarView;
