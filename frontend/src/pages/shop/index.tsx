import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IProduct } from "../../@types";
import { ShopPaginationState } from "../../@types/redux";
import { setupPagination } from "../../actions/uiActions";
import Layout from "../../components/core/Layout";
import Link from "../../components/core/Link";
import Paginate from "../../components/ui/Paginate";
import Product, { ProductShimmer } from "../../components/ui/Product";
import api from "../../services/api";
import { reduxStore } from "../../store";
import {
  PAGE_NAVIGATION_LIMIT,
  REVALIDATE_DEFAULT_TIME,
} from "../../utils/constants";

const Container = styled.main``;

const FilterOptions = styled.div``;

const ProductsSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;

  a {
    flex: 0 1 32%;

    margin: 1rem 0;

    &:nth-child(3n + 2) {
      margin-left: 2%;
      margin-right: 2%;
    }
  }
`;

interface Props {
  products: IProduct[];
  pages: number;
  total: number;
}

const Shop: React.FC<Props> = ({ products, total, pages }) => {
  const dispatch = useDispatch();

  const { products: shopProducts, loading } = useSelector<typeof reduxStore>(
    (state) => state.shopPagination
  ) as ShopPaginationState;

  useEffect(() => {
    dispatch(setupPagination(products, total, pages));
  }, []);

  return (
    <Layout>
      <Container>
        <FilterOptions></FilterOptions>
        <ProductsSection>
          {loading
            ? [...Array(PAGE_NAVIGATION_LIMIT)].map((_, i) => (
                <ProductShimmer key={i} />
              ))
            : shopProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Product product={product} />
                </Link>
              ))}
        </ProductsSection>
        <Paginate pages={pages} />
      </Container>
    </Layout>
  );
};

export default Shop;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get(`/products?limit=${PAGE_NAVIGATION_LIMIT}}`);
  const {
    data: { count },
  } = await api.get(`/products/count`);

  let pages = Math.ceil(count / PAGE_NAVIGATION_LIMIT);

  return {
    props: {
      products: data,
      total: count,
      pages,
    },
    revalidate: REVALIDATE_DEFAULT_TIME,
  };
};
