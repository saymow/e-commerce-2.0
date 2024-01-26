import styled from "styled-components";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline";
import { User } from "@styled-icons/boxicons-regular";
import { ScrollStyles } from "../../../styles/globalStyles";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
  height: 80vh;
  overflow-y: hidden;
`;

export const Info = styled.div`
  div {
    background: var(--bg-Color);

    box-shadow: var(--box-shadow);

    padding: 1rem;
  }
`;

export const Content = styled.main`
  position: relative;

  background: var(--bg-Color);
  box-shadow: var(--box-shadow);
  
  margin: 0 .5rem .5rem 0;
  padding: 2rem;

  overflow: auto;

  ${ScrollStyles}
`;

export const MainInfo = styled.main`
  display: flex;
  flex-direction: column;

  padding: 0.5rem 0;

  h1 {
    font-size: 1.6rem;
    margin-top: 1rem;
  }
`;

export const UserAvatar = styled.div`
  position: relative;

  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  margin: auto;

  background: rgba(0, 0, 0, 0.3);
`;

export const UserIcon = styled(User)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  height: 80%;

  fill: rgba(0, 0, 0, 0.3);
`;

export const Navigation = styled.ul`
  border-top: 1px solid var(--light-Grey);
  list-style: none;
  padding-top: 0.5rem;

  display: flex;
  flex-direction: column;
`;

export const Tab = styled.li`
  font-size: 1.6rem;
  padding: 0.5rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--lighter-Grey);

  &.active {
    font-weight: bold;
    color: var(--secondary-Color);

    svg {
      transform: rotate(180deg);
      fill: var(--secondary-Color);
    }
  }
`;

export const LogoutButton = styled.span`
  cursor: pointer;
`;

export const ArrowIcon = styled(ArrowIosForwardOutline)`
  width: 2rem;
  height: 2rem;

  transition: transform 200ms ease;
`;
