import React from "react";
import Image from "next/image";

import { priceFormmater, randomColor } from "../../utils";
import { IProduct } from "../../@types";

import { Container, Details, Name, Price, WishListIcon } from "./styles";

const Product: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Container detailBgColor={randomColor()}>
      <Image
        src={product.image}
        layout="responsive"
        width="100%"
        height="100%"
      />
      <Details>
        <Name>{product.name}</Name>
        <Price>{priceFormmater(product.price)}</Price>
        <WishListIcon />
      </Details>
    </Container>
  );
};

export default Product;
