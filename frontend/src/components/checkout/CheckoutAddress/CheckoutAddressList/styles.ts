import styled, { css } from "styled-components";
import { ScrollStyles } from "../../../../styles/globalStyles";

export const Container = styled.div<{ gridSplit: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
`;

export const AddressList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;

  overflow-y: auto;

  ${ScrollStyles}
  padding: .5rem;

  > li:not(:first-child) {
    margin-top: 1rem;
  }
`;

const SelectedAddress = css`
  border: 1px solid green;
  background: rgba(0, 255, 0, 0.01);
`;

export const AddressWrapper = styled.li<{ selected: boolean }>`
  list-style: none;
  cursor: pointer;

  ${({ selected }) => selected && SelectedAddress}
`;

export const ContinueBox = styled.div`
  border-top: 1px solid var(--lighter-Grey);
  padding: 1rem;

  text-align: center;
  font-size: 1.4rem;
`;
