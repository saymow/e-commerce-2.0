import styled from 'styled-components';
import { DeleteOutline } from '@styled-icons/material';

export const Container = styled.div``;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0 1rem 0;
`;

export const DeleteIcon = styled(DeleteOutline)`
  width: 1.4rem;
  height: 1.4rem;
`;
