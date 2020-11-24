import styled from "styled-components";
import { User } from "@styled-icons/boxicons-regular";

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ActionText = styled.span`
  cursor: pointer;

  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
`;

export const UserIcon = styled(User)`
  width: 2.2rem;
  height: 2.2rem;

  padding: 0.2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);

  margin-right: 1rem;

  fill: var(--primary-Color);
`;
