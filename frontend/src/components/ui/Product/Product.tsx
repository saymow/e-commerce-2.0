import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../../@types";
import { WishListState } from "../../../@types/redux";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "../../../actions/wishListActions";
import { reduxStore } from "../../../store";
import { priceFormmater, randomColor } from "../../../utils";
import {
  Container,
  Details,
  Name,
  Price,
  UnsetWishListIcon,
  WishListIcon,
} from "./styles";

const Product: React.FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useDispatch();
  const [isWishListed, setIsWishListed] = useState(false);

  const { products } = useSelector<typeof reduxStore>(
    (state) => state.wishList
  ) as WishListState;

  useEffect(() => {
    const isOnWishList = products.find(
      (_product) => _product.id === product.id
    );
    setIsWishListed(Boolean(isOnWishList));
  }, [products]);

  const handleAddToWishlist = () => {
    dispatch(addProductToWishList(product));
  };

  const handleDeleteFromWishlist = () => {
    dispatch(removeProductFromWishList(product.id));
  };

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
        {isWishListed ? (
          <UnsetWishListIcon onClick={handleDeleteFromWishlist} />
        ) : (
          <WishListIcon onClick={handleAddToWishlist} />
        )}
      </Details>
    </Container>
  );
};

export default Product;
