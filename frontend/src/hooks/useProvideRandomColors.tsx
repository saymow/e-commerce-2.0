import { useSelector } from "react-redux";
import { ThemeState } from "../@types/redux";
import { reduxStore } from "../store";

export const useProvideRandomColors = () => {
  const { theme } = useSelector<typeof reduxStore>(
    (state) => state.theme
  ) as ThemeState;

  const pool = {
    "light-mode": [
      "#1D201F",
      "#2E294E",
      "#070707",
      "#5F00BA",
      "#1D1A31",
      "#2A6041",
      "#656176",
      "#2F004F",
    ],
    "dark-mode": [
      "#FFFCF2",
      "#CCC5B9",
      "#FAF3DD",
      "#B8D3D1",
      "#E0D68A",
      "#FECEE9",
      "#E6E8E6",
      "#A4BFEB",
      "#A4A8D1",
    ],
  };

  return pool[theme][Math.floor(Math.random() * pool[theme].length)];
};
