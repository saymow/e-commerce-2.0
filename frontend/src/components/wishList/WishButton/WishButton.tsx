import React from "react";
import styled, { css } from "styled-components";
import { Heart } from "@styled-icons/boxicons-regular";
import { HeartDislike } from "@styled-icons/ionicons-outline";
import { useSelector } from "react-redux";
import { WishListState } from "../../../@types/redux";
import { reduxStore } from "../../../store";
import { IProduct } from "../../../@types";
import useWishList from "../../../hooks/useWishList";

const Container = styled.button`
  cursor: pointer;

  padding: 0.475rem;

  background: #fff;
  border: 1px solid #000;
`;

const IconsCSS = css`
  width: 2rem;
  height: 2rem;
`;

const Wish = styled(Heart)`
  ${IconsCSS}
`;

const Unwish = styled(HeartDislike)`
  ${IconsCSS}
`;

const WishButton: React.FC<{ product: IProduct }> = ({ product }) => {
  const [isOnWishList, addToWishList, removeFromWisList] = useWishList(product);

  return (
    <Container>
      {isOnWishList ? (
        <Unwish onClick={removeFromWisList} />
      ) : (
        <Wish onClick={addToWishList} />
      )}
    </Container>
  );
};

export default WishButton;
