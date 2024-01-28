import styled from 'styled-components';

export const Container = styled.div``;

export const DataSection = styled.section`
  margin-top: 1rem;
  display: grid;
  grid-template-areas: 'a a' 'b c' 'd e';
  grid-gap: 1rem;

  > * {
    &:nth-child(1) {
      grid-area: a;
    }
    &:nth-child(2) {
      grid-area: b;
    }
    &:nth-child(3) {
      grid-area: c;
    }
    &:nth-child(4) {
      grid-area: d;
    }
    &:nth-child(5) {
      grid-area: e;
    }
  }
`;
