import React from "react";
import { GetStaticProps } from "next";
import styled from "styled-components";

import api from "../services/api";
import { IProduct } from "../@types";
import TopRatedProducts from "../components/ui/TopRatedProducts";
import Layout from "../components/core/Layout";

const Container = styled.div`
  background: url("/img/background.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  z-index: -1;
`;

export const Main = styled.main`
  height: 100vh;
`;

export const Content = styled.div`
  background: var(--secondary-bg-Color);
`;

export const ContentWrapper = styled.div`
  margin: auto;

  max-width: 1260px;
  width: 100%;
  padding: 1rem;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 2.6rem;
  text-transform: uppercase;
  letter-spacing: 0.075em;
`;

export const AboutUsContainer = styled.article`
  margin: 5rem 0;
`;

export const AboutUsContent = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-evenly;
`;

export const AboutUsSection = styled.section`
  width: 30%;

  text-align: center;

  h3 {
    line-height: 4rem;
    font-size: 2rem;
  }
`;

export const Parallax = styled.div`
  height: 50vh;
  background: rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    color: #fff;
    font-size: 3em;
    text-transform: uppercase;
    letter-spacing: 0.075em;
  }
`;

const ProductsSection = styled.article`
  margin: 5rem 0;
`;

interface Props {
  products: Array<IProduct>;
}

const Home: React.FC<Props> = ({ products }) => {
  return (
    <Layout contained={false}>
      <Container>
        <Main />
        <Content>
          <ContentWrapper>
            <ProductsSection>
              <Title>Featured products</Title>
              <TopRatedProducts products={products} />
            </ProductsSection>
            <AboutUsContainer>
              <Title>About us</Title>
              <AboutUsContent>
                <AboutUsSection>
                  <h3>Our mission</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla sit amet tellus accumsan, dictum quam et, dictum
                    tortor. Nullam ac pulvinar orci. Suspendisse ante augue,
                    ullamcorper eget tellus ac, eleifend sollicitudin augue. Ut
                    eu erat id dui dictum mollis et in tellus.
                  </p>
                </AboutUsSection>
                <AboutUsSection>
                  <h3>Our promise</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla sit amet tellus accumsan, dictum quam et, dictum
                    tortor. Nullam ac pulvinar orci. Suspendisse ante augue,
                    ullamcorper eget tellus ac, eleifend sollicitudin augue. Ut
                    eu erat id dui dictum mollis et in tellus.
                  </p>
                </AboutUsSection>
              </AboutUsContent>
            </AboutUsContainer>
          </ContentWrapper>
        </Content>
        <Parallax>
          <h2>The products you need.</h2>
        </Parallax>
      </Container>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/products/top");

  return {
    props: {
      products: data,
    },
    revalidate: 60 * 5, // in seconds
  };
};
