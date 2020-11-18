import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { WishListState } from "../../../@types/redux";
import { reduxStore } from "../../../store";

import { Container, Item, Name, Price, UnwishlistIcon } from "./styles";
import { priceFormmater } from "../../../utils";
import { removeProductFromWishList } from "../../../actions/wishListActions";

const WishlistSidebarView: React.FC = () => {
  const dispatch = useDispatch();

  const { products } = useSelector<typeof reduxStore>(
    (state) => state.wishList
  ) as WishListState;

  const handleUnwishlist = (id: string) =>
    dispatch(removeProductFromWishList(id));

  return (
    <Container>
      {products.map((product) => (
        <Item key={product.id}>
          <UnwishlistIcon onClick={() => handleUnwishlist(product.id)} />
          <div>
            <Image src={product.image} width={80} height={80} />
          </div>
          <div>
            <Name>{product.name}</Name>
            <Price>{priceFormmater(product.price)}</Price>
          </div>
        </Item>
      ))}
    </Container>
  );
};

export default WishlistSidebarView;
