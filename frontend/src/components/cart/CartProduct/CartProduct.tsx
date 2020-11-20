import React from "react";
import { CartProduct as ICartProduct } from "../../../@types/redux";
import Image from "next/image";

import {
  Container,
  MinusIcon,
  PlusIcon,
  ProductDetails,
  ProductImage,
  ProductName,
  ProductPrice,
  QtyContainer,
  RemoveProductIcon,
} from "./styles";
import { priceFormmater } from "../../../utils";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../../actions/cartActions";

const CartProduct: React.FC<{ product: ICartProduct }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddProductToCart = () => {
    dispatch(addProductToCart(product));
  };

  const handleRemoveProductFromCart = (force = false) => {
    dispatch(removeProductFromCart(product.id, force));
  };

  return (
    <Container>
      <ProductImage>
        <Image src={product.image} width={80} height={80} />
      </ProductImage>
      <ProductDetails>
        <div>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{priceFormmater(product.price)}</ProductPrice>
        </div>
        <RemoveProductIcon onClick={() => handleRemoveProductFromCart(true)} />
        <QtyContainer>
          <button onClick={() => handleRemoveProductFromCart()}>
            <MinusIcon />
          </button>
          <input type="number" readOnly value={product.qty} max={99} min={1} />
          <button onClick={handleAddProductToCart}>
            <PlusIcon />
          </button>
        </QtyContainer>
      </ProductDetails>
    </Container>
  );
};

export default CartProduct;
