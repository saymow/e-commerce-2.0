import styled, { css } from 'styled-components';
import { RadioButtonOff, RadioButtonOn } from '@styled-icons/ionicons-outline';
import { DeleteOutline } from '@styled-icons/material';

export const Container = styled.div``;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0 1rem 0;
`;

export const iconsCSS = css`
  width: 1.4rem;
  height: 1.4rem;

  &:not(.no-action) {
    cursor: pointer;
  }
`;

export const Checked = styled(RadioButtonOn)`
  ${iconsCSS}
  color: green;
`;
export const Unchecked = styled(RadioButtonOff)`
  ${iconsCSS}
  color: red;
`;
export const DeleteIcon = styled(DeleteOutline)`
  ${iconsCSS}
`;
