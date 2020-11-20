import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IProduct } from "../../@types";
import { addProductToCart } from "../../actions/cartActions";
import Layout from "../../components/core/Layout";
import Button from "../../components/ui/Button";
import WishButton from "../../components/wishList/WishButton";
import api from "../../services/api";
import { REVALIDATE_DEFAULT_TIME } from "../../utils/constants";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;

  padding: 1rem;
`;

const ImageContainer = styled.div``;

const DetailsContainer = styled.div`
  position: relative;
  padding: 0 2rem;
`;

export const Information = styled.div`
  max-width: 35rem;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  text-transform: uppercase;
`;

const Description = styled.p`
  margin: 0.8rem 0;
  font-size: 1.4rem;
`;

const QtyInStock = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  text-transform: uppercase;
  font-size: 1.6rem;
  color: #ccc;
`;

const Options = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;

  display: flex;
  align-items: center;

  > button:first-child {
    margin-right: 0.5rem;
  }
`;

const Product: React.FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddProductToCart = () => {
    dispatch(addProductToCart(product));
  };

  return (
    <Layout>
      <Container>
        <ImageContainer>
          <Image
            src={product.image}
            layout={"responsive"}
            width={"100%"}
            height={"100%"}
          />
        </ImageContainer>
        <DetailsContainer>
          <Information>
            <Title>{product.name}</Title>
            <Description>{product.description}</Description>
            <QtyInStock>
              <strong>{product.count_in_stock}</strong> left
            </QtyInStock>
          </Information>
          <Options>
            <WishButton product={product} />
            <Button onClick={handleAddProductToCart}>ADD TO CART</Button>
          </Options>
        </DetailsContainer>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("/products?limit=999");
  const paths = (data as IProduct[]).map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await api.get(`/products/${id}`);

  return {
    props: {
      product: data,
    },
    revalidate: REVALIDATE_DEFAULT_TIME,
  };
};

export default Product;
