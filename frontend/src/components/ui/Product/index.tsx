export { default } from "./Product";
import styled from "styled-components";
import Skeleton from "../Skeleton";

//As the products are square-sized, their height is based on the width.
const Container = styled.div`
  width: 30%;
  height: calc(min(100vw, 1260px) * 0.3);
  position: relative;
  flex: 0 1 32%;

  margin: 1rem 0;

  &:nth-child(3n + 2) {
    margin-left: 2%;
    margin-right: 2%;
  }

  div.skeleton-product {
    width: 100%;
    height: 100%;

    div.skeleton-product-image {
    }

    div.skeleton-product-details {
      position: absolute;
      top: 0;
      left: 0;
      height: 8rem;
      background: transparent;

      width: 100%;

      div.skeleton-product-details-name {
        width: 60%;
        height: 4rem;
      }

      div.skeleton-product-details-price {
        width: 30%;
        height: 3rem;
      }

      div.skeleton-product-details-wishlist {
        position: absolute;
        top: 0;
        right: 0;

        width: 3rem;
        height: 3rem;
      }

      div.skeleton-product-details-name,
      div.skeleton-product-details-price,
      div.skeleton-product-details-wishlist {
        filter: brightness(96%);
      }
    }
  }
`;

export const ProductShimmer = () => {
  return (
    <Container>
      <Skeleton className="skeleton-product">
        <Skeleton className="skeleton-product-image" />
        <Skeleton className="skeleton-product-details">
          <Skeleton className="skeleton-product-details-name" />
          <Skeleton className="skeleton-product-details-price" />
          <Skeleton className="skeleton-product-details-wishlist" />
        </Skeleton>
      </Skeleton>
    </Container>
  );
};
