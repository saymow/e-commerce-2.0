import Image from "next/image";
import React from "react";
import { IProduct } from "../../../@types";
import { useProvideRandomColors } from "../../../hooks/useProvideRandomColors";
import useWishList from "../../../hooks/useWishList";
import { priceFormmater } from "../../../utils";
import {
  Container,
  Details,
  Name,
  Price,
  UnsetWishListIcon,
  WishListIcon,
} from "./styles";

const Product: React.FC<{ product: IProduct }> = ({ product }) => {
  const randomColor = useProvideRandomColors();
  const [isWishListed, addToWishList, removeFromWishList] = useWishList(
    product
  );

  return (
    <Container detailBgColor={randomColor}>
      <Image
        src={product.image}
        layout="responsive"
        width="100%"
        height="100%"
      />
      <Details>
        <Name>{product.name}</Name>
        <Price>{priceFormmater(product.price)}</Price>
        {isWishListed ? (
          <UnsetWishListIcon onClick={removeFromWishList} />
        ) : (
          <WishListIcon onClick={addToWishList} />
        )}
      </Details>
    </Container>
  );
};

export default Product;
