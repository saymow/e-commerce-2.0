import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContainedContent = css`
  margin: 8rem auto 2rem auto;
  max-width: 1260px;
  width: 100%;
`;

export const Content = styled.div<{ contained: boolean }>`
  flex-grow: 1;

  ${({ contained }) => contained && ContainedContent}
`;
