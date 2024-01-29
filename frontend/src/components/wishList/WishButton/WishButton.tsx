import { Heart } from "@styled-icons/boxicons-regular";
import { HeartDislike } from "@styled-icons/ionicons-outline";
import React from "react";
import styled, { css } from "styled-components";
import { IProduct } from "../../../@types";
import useWishList from "../../../hooks/useWishList";

const Container = styled.button`
  cursor: pointer;

  padding: 0.475rem;

  background: var(--bg-Color);
  border: 1px solid var(--primary-Color);
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
    <Container className="product-wish-button">
      {isOnWishList ? (
        <Unwish onClick={removeFromWisList} />
      ) : (
        <Wish onClick={addToWishList} />
      )}
    </Container>
  );
};

export default WishButton;
