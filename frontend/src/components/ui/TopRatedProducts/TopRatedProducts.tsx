import Image from "next/image";
import React from "react";
import { IProduct } from "../../../@types";
import { priceFormmater } from "../../../utils";
import Rating from "../Rating";
import {
  Container,
  Details,
  Name,
  Price,
  Product,
  RatingContainer,
} from "./styles";

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
