import React from "react";
import Image from "next/image";
import { IProduct } from "../../@types";

import {
  Container,
  Product,
  Details,
  Name,
  RatingContainer,
  Price,
} from "./styles";
import { priceFormmater } from "../../utils";
import Rating from "../Rating";

interface Props {
  products: IProduct[];
}

const TopRatedProducts: React.FC<Props> = ({ products }) => {
  const rateOrderedProducts = products.sort((a, b) => b.rating - a.rating);

  return (
    <Container>
      {rateOrderedProducts.map((product) => (
        <Product key={product.id}>
          <Image
            src={product.image}
            alt={product.name}
            height={480}
            width={420}
          />
          <Details>
            <Name>{product.name}</Name>
            <RatingContainer>
              <Rating value={product.rating} />
            </RatingContainer>
            <Price>{priceFormmater(product.price)}</Price>
          </Details>
        </Product>
      ))}
    </Container>
  );
};

export default TopRatedProducts;
