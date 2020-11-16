import styled from "styled-components";

export const Container = styled.div`
  margin: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

export const Product = styled.section`
  position: relative;
`;

export const Details = styled.div`
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;

  width: 90%;
  height: 6rem;
  padding: 0.5rem;
  box-sizing: content-box;

  background: #d5dadd;
  background: #d0cccc;
`;

export const Name = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const RatingContainer = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
`;

export const Price = styled.span``;
