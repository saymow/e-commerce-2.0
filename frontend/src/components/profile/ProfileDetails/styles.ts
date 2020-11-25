import styled from "styled-components";
import { BadgeCheck } from "@styled-icons/boxicons-solid";

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-areas: "info progress" "options options";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 3fr 1fr;
`;

export const UserInfo = styled.main`
  grid-area: info;
  border-right: 1px solid var(--light-Grey);

  p {
    font-size: 1.4rem;
    line-height: 3rem;
  }
`;

export const CheckIcon = styled(BadgeCheck)`
  width: 2.2rem;
  height: 2.2rem;

  fill: green;
`;

export const UserInfoProgress = styled.div`
  grid-area: progress;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PerfilCompletition = styled.div`
  width: 80%;
`;

export const Progress = styled.div<{ fillCoeff: string }>`
  position: relative;
  width: 100%;
  height: 2rem;

  border: 1px solid green;

  margin: 1rem 0;

  span {
    display: block;
    /* background: green; */
    height: 100%;
    width: ${({ fillCoeff }) => fillCoeff};

    background-image: linear-gradient(
      -90deg,
      green 0%,
      #0cba006b 50%,
      green 100%
    );
    background-size: 400% 400%;
    animation: shimmer 3s ease-in-out infinite;
    @keyframes shimmer {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: -135% 0%;
      }
    }
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.4rem;
    font-weight: bold;
    color: var(--bg-Color);
  }
`;

export const UserOptions = styled.div`
  grid-area: options;
  border-top: 1px solid var(--light-Grey);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    input:checkbox {
      width: 1.6rem;
      height: 1.6rem;
    }

    label {
      margin-left: 0.6rem;
      font-size: 1.4rem;
    }

    span {
      color: var(--light-Grey);
      font-size: 1rem;
    }
  }
`;
