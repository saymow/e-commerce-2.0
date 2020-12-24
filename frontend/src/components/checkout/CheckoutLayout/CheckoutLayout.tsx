import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CartState } from "../../../@types/redux";
import { reduxStore } from "../../../store";
import { priceFormmater } from "../../../utils";
import CheckoutProduct from "./CheckoutProduct";
import CartLockedBackdrop from "../../cart/CartLockedBackdrop";
import {
  Container,
  ProductList,
  CartContainer,
  ContentContainer,
  CartTotal,
  CartTotalItem,
} from "./styles";
import useLockedCartDimensions from "../../cart/CartLockedBackdrop/useLockedCartDimensions";

interface Props {
  title: string;
  contentSize?: "small" | "large";
  detailed?: boolean;
  contentOverflow?: "auto" | "hidden";
}

const CheckoutLayout: React.FC<Props> = ({
  title,
  detailed,
  contentSize = "small",
  contentOverflow = "unset",
  children,
}) => {
  const { products, subtotal, shippingCost, total } = useSelector<
    typeof reduxStore
  >((state) => state.cart) as CartState;

  const [
    productListRef,
    locked,
    lockedCartDimension,
  ] = useLockedCartDimensions();

  const cartSize = contentSize === "small" ? "large" : "small";

  return (
    <Container contentSize={contentSize}>
      <CartContainer cartSize={cartSize}>
        <h1>Cart Products</h1>
        <ProductList ref={productListRef as any}>
          <CartLockedBackdrop
            locked={locked}
            dimensions={lockedCartDimension}
          />
          {products.map((product) => (
            <CheckoutProduct
              size={cartSize}
              key={product.id}
              product={product}
            />
          ))}
        </ProductList>
        {detailed && (
          <CartTotal>
            <CartTotalItem>
              <strong>subtotal</strong> {priceFormmater(subtotal)}
            </CartTotalItem>
            <CartTotalItem>
              <strong>Shipping cost</strong> {priceFormmater(shippingCost)}
            </CartTotalItem>
            <CartTotalItem highlight>
              <strong>Total</strong> {priceFormmater(total)}
            </CartTotalItem>
          </CartTotal>
        )}
      </CartContainer>
      <ContentContainer overflow={contentOverflow}>
        <h1>{title}</h1>
        <div>{children}</div>
      </ContentContainer>
    </Container>
  );
};

export default CheckoutLayout;
