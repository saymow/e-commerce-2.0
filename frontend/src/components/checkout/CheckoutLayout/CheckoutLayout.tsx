import React from "react";
import { useSelector } from "react-redux";
import { CartState } from "../../../@types/redux";
import { reduxStore } from "../../../store";
import CheckoutProduct from "./CheckoutProduct";
import {
  Container,
  ProductList,
  ProductsContainer,
  InfoContainer,
} from "./styles";

const CheckoutLayout: React.FC<{ title: string }> = ({ title, children }) => {
  const { products } = useSelector<typeof reduxStore>(
    (state) => state.cart
  ) as CartState;

  return (
    <Container>
      <ProductsContainer>
        <h1>Cart Products</h1>
        <ProductList>
          {products.map((product) => (
            <CheckoutProduct key={product.id} product={product} />
          ))}
        </ProductList>
      </ProductsContainer>
      <InfoContainer>
        <h1>{title}</h1>
        <div>{children}</div>
      </InfoContainer>
    </Container>
  );
};

export default CheckoutLayout;
