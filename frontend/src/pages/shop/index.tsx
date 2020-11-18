import React from "react";
import { GetStaticProps } from "next";

import styled from "styled-components";

import Layout from "../../components/ui/Layout";
import { IProduct } from "../../@types";
import api from "../../services/api";
import Link from "next/link";
import Product from "../../components/ui/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reduxStore } from "../../store";
import { setupPagination, shopPaginate } from "../../actions/paginationActions";
import Paginate from "../../components/ui/Paginate";
import { PAGE_NAVIGATION_LIMIT } from "../../utils/constants";
import { ShopPaginationState } from "../../@types/redux";

const Container = styled.main`
  margin: 2rem 0;
`;
const FilterOptions = styled.div``;
const ProductsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
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
          {loading ? (
            <h1>Loadinng</h1>
          ) : (
            shopProducts.map((product) => (
              <Link key={product.id} href={`/shop/${encodeURI(product.name)}`}>
                <Product product={product} />
              </Link>
            ))
          )}
        </ProductsSection>
        <Paginate pages={pages} />
      </Container>
    </Layout>
  );
};

export default Shop;

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    revalidate: 60 * 5,
  };
};
