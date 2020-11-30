import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Sun, Moon } from "@styled-icons/boxicons-regular";
import { MoonOutline } from "@styled-icons/evaicons-outline";
import { switchTheme } from "../../../actions/uiActions";
import { useDispatch, useSelector } from "react-redux";
import { ThemeState } from "../../../@types/redux";
import { reduxStore } from "../../../store";

const Container = styled.span`
  > label {
    display: block;

    position: relative;
    width: 3.8rem;
    height: 1.8rem;
    border-radius: 1rem;

    cursor: pointer;

    transition: background 200ms ease;

    background: rgba(0, 0, 0, 0.2);
  }
`;

const Input = styled.input`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;

  &:checked {
    + label {
      background: rgba(0, 0, 0, 0.5);

      div {
        transform: translateX(135%);
      }
    }
  }
`;

const BallLabel = styled.div`
  position: absolute;
  top: calc(50% - 0.8rem);
  z-index: 2;

  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;

  transition: transform 200ms ease;

  background: #fff;
`;

const iconsCss = css`
  position: absolute;

  width: 1.5rem;
  height: 1.5rem;
`;

const SunIcon = styled(Sun)`
  ${iconsCss};
  left: 0;
  top: calc(50% - 0.75rem);

  fill: #f9d71c;
`;

const MoonIcon = styled(Moon)`
  ${iconsCss}
  right: 0;
  top: calc(50% - 0.75rem);

  fill: #999;
`;

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector<typeof reduxStore>(
    (state) => state.theme
  ) as ThemeState;

  const _switchTheme = () => {
    dispatch(switchTheme());
  };

  console.log(theme);

  return (
    <Container>
      <Input
        type="checkbox"
        id="theme-checkbox"
        checked={theme === "dark-mode"}
        onChange={_switchTheme}
      />
      <label htmlFor="theme-checkbox">
        <BallLabel />
        <SunIcon />
        <MoonIcon />
      </label>
    </Container>
  );
};

export default ThemeSwitcher;
