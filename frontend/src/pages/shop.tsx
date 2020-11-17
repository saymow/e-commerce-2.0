import React from "react";
import { GetStaticProps } from "next";
import styled from "styled-components";

import Layout from "../components/Layout";
import { IProduct } from "../@types";
import api from "../services/api";
import Link from "next/link";
import Product from "../components/Product";

interface Props {
  products: IProduct[];
}

const Container = styled.main``;
const FilterOptions = styled.div``;
const ProductsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Shop: React.FC<Props> = ({ products }) => {
  return (
    <Layout>
      <Container>
        <FilterOptions></FilterOptions>
        <ProductsSection>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${encodeURIComponent(product.name)}`}
            >
              <Product product={product} />
            </Link>
          ))}
        </ProductsSection>
      </Container>
    </Layout>
  );
};

export default Shop;

export const getStaticProps: GetStaticProps = async () => {
  let limit = 2;
  const { data } = await api.get(`/products?limit=${limit}`);

  return {
    props: {
      products: data,
    },
    revalidate: 60 * 5,
  };
};
